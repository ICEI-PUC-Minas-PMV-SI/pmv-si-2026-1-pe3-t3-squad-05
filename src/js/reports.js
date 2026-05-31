function getReportFilters(form) {
    const formData = new FormData(form);

    return {
        tipo: formData.get("tipoRelatorio"),
        dataInicio: formData.get("dataInicio"),
        dataFim: formData.get("dataFim")
    };
}

function generateReport(filters, output) {
    if (filters.tipo === "encomendas") {
        return generateCustomOrdersReport(filters, output);
    }

    return generateStockSalesReport(filters, output);
}

function generateStockSalesReport(filters, output) {
    const pedidosPeriodo = filterOrdersByPeriod(SGP_DATA.pedidos, filters.dataInicio, filters.dataFim);
    const totalVendas = pedidosPeriodo.reduce((total, pedido) => total + Number(pedido.total || 0), 0);
    const mediaVendas = pedidosPeriodo.length ? totalVendas / pedidosPeriodo.length : 0;
    const produtosVendidos = summarizeSoldProducts(pedidosPeriodo);
    const consumoInsumos = estimateIngredientConsumption(pedidosPeriodo);

    if (output === "html") {
        return {
            fileName: `relatorio-estoque-vendas-${getDateStamp()}.html`,
            mimeType: "text/html;charset=utf-8",
            content: buildPrintableStockSalesHtml({
                pedidosPeriodo,
                totalVendas,
                mediaVendas,
                produtosVendidos,
                consumoInsumos,
                filters
            })
        };
    }

    const rows = [
        ["Relatorio semanal de estoque, produtos, consumo de insumos e media de vendas"],
        ["Periodo", formatReportPeriod(filters)],
        ["Gerado em", new Date().toLocaleString("pt-BR")],
        [],
        ["Resumo de vendas"],
        ["Pedidos no periodo", pedidosPeriodo.length],
        ["Total vendido", formatCurrency(totalVendas)],
        ["Media por pedido", formatCurrency(mediaVendas)],
        [],
        ["Produtos"],
        ["ID", "Produto", "Categoria", "Preco", "Estoque", "Status"]
    ];

    SGP_DATA.produtos.forEach((produto) => {
        rows.push([
            produto.id,
            produto.nome,
            produto.categoria,
            produto.preco,
            produto.estoque,
            produto.disponibilidade ? "Disponivel" : "Indisponivel"
        ]);
    });

    rows.push(
        [],
        ["Estoque de insumos"],
        ["ID", "Insumo", "Quantidade", "Unidade", "Nivel critico", "Fornecedor", "Status"]
    );

    SGP_DATA.insumos.forEach((insumo) => {
        rows.push([
            insumo.id,
            insumo.nome,
            insumo.quantidade,
            insumo.unidade,
            insumo.nivelCritico,
            insumo.fornecedor,
            insumo.quantidade <= insumo.nivelCritico ? "Critico" : "Adequado"
        ]);
    });

    rows.push(
        [],
        ["Consumo estimado de insumos no periodo"],
        ["Insumo", "Consumo estimado", "Unidade"]
    );

    consumoInsumos.forEach((item) => {
        rows.push([item.nome, item.quantidade, item.unidade]);
    });

    rows.push(
        [],
        ["Consumo por itens vendidos no periodo"],
        ["Item", "Quantidade em pedidos"]
    );

    Object.entries(produtosVendidos).forEach(([item, quantidade]) => {
        rows.push([item, quantidade]);
    });

    if (!Object.keys(produtosVendidos).length) {
        rows.push(["Sem itens vendidos no periodo", 0]);
    }

    return {
        fileName: `relatorio-estoque-vendas-${getDateStamp()}.csv`,
        mimeType: "text/csv;charset=utf-8",
        content: toCsv(rows)
    };
}

function generateCustomOrdersReport(filters, output) {
    const pedidos = filterOrdersByPeriod(SGP_DATA.pedidos, filters.dataInicio, filters.dataFim)
        .filter((pedido) => pedido.tipo === "Encomenda personalizada");

    if (output === "csv") {
        const rows = [
            ["Relatorio semanal de encomendas personalizadas e status"],
            ["Periodo", formatReportPeriod(filters)],
            ["Gerado em", new Date().toLocaleString("pt-BR")],
            [],
            ["Pedido", "Cliente", "Email", "Data", "Horario", "Recebimento", "Status", "Recorrencia", "Total", "Itens"]
        ];

        pedidos.forEach((pedido) => {
            rows.push([
                pedido.id,
                pedido.cliente,
                pedido.clienteEmail,
                pedido.data,
                pedido.horario,
                pedido.tipoEntrega,
                pedido.status,
                reportRecurrenceLabel(pedido),
                pedido.total,
                (pedido.itens || []).join("; ")
            ]);
        });

        if (!pedidos.length) {
            rows.push(["Sem encomendas personalizadas no periodo"]);
        }

        return {
            fileName: `relatorio-encomendas-${getDateStamp()}.csv`,
            mimeType: "text/csv;charset=utf-8",
            content: toCsv(rows)
        };
    }

    return {
        fileName: `relatorio-encomendas-${getDateStamp()}.html`,
        mimeType: "text/html;charset=utf-8",
        content: buildPrintableCustomOrdersHtml(pedidos, filters)
    };
}

function downloadReport(report) {
    const blob = new Blob([report.content], { type: report.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = report.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function previewReport(report) {
    const blob = new Blob([report.content], { type: report.mimeType });
    const url = URL.createObjectURL(blob);
    const previewWindow = window.open(url, "_blank");

    if (!previewWindow) {
        downloadReport(report);
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function filterOrdersByPeriod(pedidos, dataInicio, dataFim) {
    const startDate = dataInicio ? new Date(`${dataInicio}T00:00:00`) : null;
    const endDate = dataFim ? new Date(`${dataFim}T23:59:59`) : null;

    return pedidos.filter((pedido) => {
        const orderDate = parseBrazilianDate(pedido.data);
        if (!orderDate) return true;
        if (startDate && orderDate < startDate) return false;
        if (endDate && orderDate > endDate) return false;
        return true;
    });
}

function summarizeSoldProducts(pedidos) {
    return pedidos.reduce((summary, pedido) => {
        (pedido.itens || []).forEach((item) => {
            summary[item] = (summary[item] || 0) + 1;
        });

        return summary;
    }, {});
}

function estimateIngredientConsumption(pedidos) {
    const totals = SGP_DATA.insumos.reduce((summary, insumo) => {
        summary[insumo.id] = { nome: insumo.nome, quantidade: 0, unidade: insumo.unidade };
        return summary;
    }, {});

    pedidos.forEach((pedido) => {
        (pedido.itens || []).forEach((item) => {
            const itemText = normalizeText(item);
            const quantity = itemText.includes("kit") ? 2 : 1;

            addEstimatedConsumption(totals, 1, 0.35 * quantity);
            addEstimatedConsumption(totals, 2, 0.12 * quantity);
            addEstimatedConsumption(totals, 3, 4 * quantity);

            if (itemText.includes("bolo") || itemText.includes("brigadeiro")) {
                addEstimatedConsumption(totals, 4, 0.08 * quantity);
            }

            if (itemText.includes("pao") || itemText.includes("kit")) {
                addEstimatedConsumption(totals, 5, 0.02 * quantity);
            }
        });
    });

    return Object.values(totals).map((item) => ({
        ...item,
        quantidade: Number(item.quantidade.toFixed(2))
    }));
}

function addEstimatedConsumption(totals, id, quantidade) {
    if (!totals[id]) return;
    totals[id].quantidade += quantidade;
}

function normalizeText(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function parseBrazilianDate(value) {
    if (!value) return null;
    const [day, month, year] = value.split("/").map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
}

function toCsv(rows) {
    return `\uFEFF${rows.map((row) => row.map(escapeCsvValue).join(";")).join("\r\n")}`;
}

function escapeCsvValue(value) {
    const stringValue = String(value ?? "");
    if (/[;"\r\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
}

function buildPrintableCustomOrdersHtml(pedidos, filters) {
    const rows = pedidos.length
        ? pedidos.map((pedido) => `
            <tr>
                <td>${escapeHtml(pedido.id)}</td>
                <td>${escapeHtml(pedido.cliente)}</td>
                <td>${escapeHtml(pedido.data)} ${escapeHtml(pedido.horario)}</td>
                <td>${escapeHtml(pedido.tipoEntrega)}</td>
                <td>${escapeHtml(pedido.status)}</td>
                <td>${escapeHtml(reportRecurrenceLabel(pedido))}</td>
                <td>${escapeHtml(formatCurrency(pedido.total))}</td>
                <td>${escapeHtml((pedido.itens || []).join(", "))}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="8">Sem encomendas personalizadas no periodo selecionado.</td></tr>`;

    return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Relatorio de encomendas personalizadas</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 32px; color: #2f2721; }
        h1 { margin-bottom: 4px; }
        p { color: #6f6258; }
        table { width: 100%; border-collapse: collapse; margin-top: 24px; }
        th, td { border: 1px solid #ddd4ca; padding: 10px; text-align: left; vertical-align: top; }
        th { background: #f4efe9; }
        .actions { margin: 24px 0; }
        button { padding: 10px 16px; border: 0; background: #8a4b32; color: white; cursor: pointer; }
        @media print { .actions { display: none; } body { margin: 12mm; } }
    </style>
</head>
<body>
    <h1>Relatorio de encomendas personalizadas</h1>
    <p>Periodo: ${escapeHtml(formatReportPeriod(filters))}</p>
    <p>Gerado em: ${escapeHtml(new Date().toLocaleString("pt-BR"))}</p>
    <div class="actions"><button onclick="window.print()">Imprimir ou salvar em PDF</button></div>
    <table>
        <thead>
            <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Data/Horario</th>
                <th>Recebimento</th>
                <th>Status</th>
                <th>Recorrencia</th>
                <th>Total</th>
                <th>Itens</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
    </table>
</body>
</html>`;
}

function buildPrintableStockSalesHtml(reportData) {
    const { pedidosPeriodo, totalVendas, mediaVendas, produtosVendidos, consumoInsumos, filters } = reportData;
    const productRows = SGP_DATA.produtos.map((produto) => `
        <tr>
            <td>${escapeHtml(produto.id)}</td>
            <td>${escapeHtml(produto.nome)}</td>
            <td>${escapeHtml(produto.categoria)}</td>
            <td>${escapeHtml(formatCurrency(produto.preco))}</td>
            <td>${escapeHtml(produto.estoque)}</td>
            <td>${escapeHtml(produto.disponibilidade ? "Disponivel" : "Indisponivel")}</td>
        </tr>
    `).join("");
    const stockRows = SGP_DATA.insumos.map((insumo) => `
        <tr>
            <td>${escapeHtml(insumo.nome)}</td>
            <td>${escapeHtml(insumo.quantidade)}</td>
            <td>${escapeHtml(insumo.unidade)}</td>
            <td>${escapeHtml(insumo.nivelCritico)}</td>
            <td>${escapeHtml(insumo.fornecedor)}</td>
            <td>${escapeHtml(insumo.quantidade <= insumo.nivelCritico ? "Critico" : "Adequado")}</td>
        </tr>
    `).join("");
    const consumptionRows = consumoInsumos.map((item) => `
        <tr>
            <td>${escapeHtml(item.nome)}</td>
            <td>${escapeHtml(item.quantidade)}</td>
            <td>${escapeHtml(item.unidade)}</td>
        </tr>
    `).join("");
    const soldRows = Object.entries(produtosVendidos).length
        ? Object.entries(produtosVendidos).map(([item, quantidade]) => `
            <tr>
                <td>${escapeHtml(item)}</td>
                <td>${escapeHtml(quantidade)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="2">Sem itens vendidos no periodo selecionado.</td></tr>`;

    return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Relatorio de estoque, produtos e vendas</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 32px; color: #2f2721; }
        h1 { margin-bottom: 4px; }
        h2 { margin-top: 28px; }
        p { color: #6f6258; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { border: 1px solid #ddd4ca; padding: 10px; text-align: left; vertical-align: top; }
        th { background: #f4efe9; }
        .summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 24px; }
        .summary div { border: 1px solid #ddd4ca; padding: 12px; background: #fbf8f4; }
        .actions { margin: 24px 0; }
        button { padding: 10px 16px; border: 0; background: #8a4b32; color: white; cursor: pointer; }
        @media print { .actions { display: none; } body { margin: 12mm; } }
    </style>
</head>
<body>
    <h1>Relatorio de estoque, produtos e vendas</h1>
    <p>Periodo: ${escapeHtml(formatReportPeriod(filters))}</p>
    <p>Gerado em: ${escapeHtml(new Date().toLocaleString("pt-BR"))}</p>
    <div class="actions"><button onclick="window.print()">Imprimir ou salvar em PDF</button></div>
    <section class="summary">
        <div><strong>Pedidos no periodo</strong><br>${escapeHtml(pedidosPeriodo.length)}</div>
        <div><strong>Total vendido</strong><br>${escapeHtml(formatCurrency(totalVendas))}</div>
        <div><strong>Media por pedido</strong><br>${escapeHtml(formatCurrency(mediaVendas))}</div>
    </section>
    <h2>Produtos</h2>
    <table>
        <thead><tr><th>ID</th><th>Produto</th><th>Categoria</th><th>Preco</th><th>Estoque</th><th>Status</th></tr></thead>
        <tbody>${productRows}</tbody>
    </table>
    <h2>Estoque de insumos</h2>
    <table>
        <thead><tr><th>Insumo</th><th>Quantidade</th><th>Unidade</th><th>Nivel critico</th><th>Fornecedor</th><th>Status</th></tr></thead>
        <tbody>${stockRows}</tbody>
    </table>
    <h2>Consumo estimado de insumos</h2>
    <table>
        <thead><tr><th>Insumo</th><th>Consumo estimado</th><th>Unidade</th></tr></thead>
        <tbody>${consumptionRows}</tbody>
    </table>
    <h2>Itens vendidos no periodo</h2>
    <table>
        <thead><tr><th>Item</th><th>Quantidade em pedidos</th></tr></thead>
        <tbody>${soldRows}</tbody>
    </table>
</body>
</html>`;
}

function reportRecurrenceLabel(pedido) {
    if (!pedido.recorrencia || !pedido.recorrencia.ativa) {
        return "Pedido unico";
    }

    return `Recorrente (${pedido.recorrencia.frequencia})`;
}

function formatReportPeriod(filters) {
    const start = filters.dataInicio ? formatInputDate(filters.dataInicio) : "inicio";
    const end = filters.dataFim ? formatInputDate(filters.dataFim) : "hoje";
    return `${start} a ${end}`;
}

function formatInputDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}

function getDateStamp() {
    return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
