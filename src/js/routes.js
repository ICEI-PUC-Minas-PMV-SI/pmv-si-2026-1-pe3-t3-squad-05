const Router = {
    home() {
        return `
            <section class="hero">
                <div class="hero-copy">
                    <span class="eyebrow">Protótipo navegável</span>
                    <h1>Gestão de pedidos, encomendas e estoque para panificadoras.</h1>
                    <p>Experimente os fluxos principais do SGP como cliente ou gerente, com dados simulados para avaliação de usabilidade.</p>
                    <div class="hero-actions">
                        <button class="btn btn-primary" data-action="go" data-route="catalogo">
                            <i class="fa-solid fa-bread-slice" aria-hidden="true"></i>
                            Ver catálogo
                        </button>
                        <button class="btn btn-secondary" data-action="go" data-route="dashboard">
                            <i class="fa-solid fa-chart-line" aria-hidden="true"></i>
                            Área do gerente
                        </button>
                    </div>
                </div>
                <div class="hero-panel" aria-label="Resumo do sistema">
                    <div>
                        <strong>${SGP_DATA.produtos.filter((produto) => produto.disponibilidade).length}</strong>
                        <span>produtos disponíveis</span>
                    </div>
                    <div>
                        <strong>${SGP_DATA.pedidos.length}</strong>
                        <span>pedidos simulados</span>
                    </div>
                    <div>
                        <strong>${SGP_DATA.insumos.filter((insumo) => insumo.quantidade <= insumo.nivelCritico).length}</strong>
                        <span>alertas de estoque</span>
                    </div>
                </div>
            </section>

            <section class="content-band">
                <div class="section-heading">
                    <span class="eyebrow">Fluxos prioritários</span>
                    <h2>O que este protótipo valida</h2>
                </div>
                <div class="feature-grid">
                    ${[
                        ["Cadastro e catálogo", "Validação visual de dados e consulta de produtos com preço e disponibilidade."],
                        ["Compra e retirada", "Carrinho, agendamento, pagamento simulado e confirmação do pedido."],
                        ["Encomenda personalizada", "Configuração de bolo com formato, tamanho, recheio, cobertura e referência."],
                        ["Painel gerencial", "Pedidos, produtos, estoque critico e relatorios gerados com dados atuais."]
                    ].map(([titulo, texto]) => `
                        <article class="feature-item">
                            <h3>${titulo}</h3>
                            <p>${texto}</p>
                        </article>
                    `).join("")}
                </div>
            </section>
        `;
    },

    login() {
        return `
            <section class="page-layout narrow">
                <div class="section-heading">
                    <h2>Entrar</h2>
                    <p>Acesse com e-mail e senha cadastrados para continuar usando o sistema.</p>
                </div>

                <form id="login-form" class="form-card" novalidate>
                    <label>
                        E-mail
                        <input type="email" name="email" placeholder="nome@email.com" required>
                        <small data-error-for="email"></small>
                    </label>
                    <label>
                        Senha
                        <input type="password" name="senha" placeholder="Digite sua senha" required>
                        <small data-error-for="senha"></small>
                    </label>
                    <button class="btn btn-primary full-width" type="submit">
                        <i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
                        Entrar
                    </button>
                    <button class="btn btn-ghost full-width" type="button" data-action="go" data-route="cadastro">
                        Criar novo cadastro
                    </button>
                </form>
            </section>
        `;
    },

    cadastro() {
        return `
            <section class="page-layout narrow">
                <div class="section-heading">
                    <h2>Cadastro de usuário</h2>
                    <p>Preencha os dados para simular a entrada no sistema. Os campos validam e-mail, CPF e data de nascimento.</p>
                </div>

                <form id="cadastro-form" class="form-card" novalidate>
                    <label>
                        Nome completo
                        <input type="text" name="nome" placeholder="Ex.: Ana Paula Souza" required>
                        <small data-error-for="nome"></small>
                    </label>
                    <label>
                        CPF
                        <input type="text" name="cpf" placeholder="000.000.000-00" required>
                        <small data-error-for="cpf"></small>
                    </label>
                    <label>
                        Data de nascimento
                        <input type="date" name="dataNascimento" required>
                        <small data-error-for="dataNascimento"></small>
                    </label>
                    <label>
                        E-mail
                        <input type="email" name="email" placeholder="nome@email.com" required>
                        <small data-error-for="email"></small>
                    </label>
                    <label>
                        Telefone
                        <input type="tel" name="telefone" placeholder="(31) 99999-9999" required>
                        <small data-error-for="telefone"></small>
                    </label>
                    <label>
                        Senha
                        <input type="password" name="senha" placeholder="Mínimo de 4 caracteres" required>
                        <small data-error-for="senha"></small>
                    </label>
                    <label>
                        Perfil
                        <select name="perfil" required>
                            <option value="Cliente">Cliente</option>
                            <option value="Gerente">Gerente</option>
                        </select>
                        <small data-error-for="perfil"></small>
                    </label>
                    <button class="btn btn-primary full-width" type="submit">
                        <i class="fa-solid fa-check" aria-hidden="true"></i>
                        Criar cadastro
                    </button>
                </form>
            </section>
        `;
    },

    catalogo() {
        const filtros = SGP_DATA.categorias.map((categoria) => `
            <button class="chip ${AppState.filtroCategoria === categoria ? "active" : ""}" data-action="filter" data-category="${categoria}">
                ${categoria}
            </button>
        `).join("");

        const produtos = filtrarProdutos().map((produto) => `
            <article class="product-card">
                <div class="product-image">
                    <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                    <span class="badge ${produto.disponibilidade ? "success" : "danger"}">
                        ${produto.disponibilidade ? "Disponível" : "Esgotado"}
                    </span>
                </div>
                <div class="product-content">
                    <span class="category">${produto.categoria}</span>
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <div class="product-meta">
                        <strong>${formatCurrency(produto.preco)}</strong>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-ghost" data-action="go" data-route="produto" data-id="${produto.id}">
                            Detalhes
                        </button>
                        <button class="btn btn-primary" data-action="add-cart" data-id="${produto.id}" ${produto.disponibilidade ? "" : "disabled"}>
                            <i class="fa-solid fa-plus" aria-hidden="true"></i>
                            Adicionar
                        </button>
                    </div>
                </div>
            </article>
        `).join("");

        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Catálogo de produtos</h2>
                    <p>Produtos com foto, descrição, preço e disponibilidade para demonstrar a experiência do cliente.</p>
                </div>
                <div class="toolbar">
                    <div class="chip-group" aria-label="Filtros de categoria">${filtros}</div>
                    <label class="search-field">
                        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                        <input id="catalog-search" type="search" value="${AppState.busca}" placeholder="Buscar produto">
                    </label>
                </div>
                <div class="product-grid">${produtos || emptyState("Nenhum produto encontrado.", "Ajuste os filtros para visualizar outros itens.")}</div>
            </section>
        `;
    },

    produto(id) {
        const produto = SGP_DATA.produtos.find((item) => item.id === Number(id)) || SGP_DATA.produtos[0];

        return `
            <section class="detail-layout">
                <div class="detail-image">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                <div class="detail-content">
                    <button class="link-button" data-action="go" data-route="catalogo">
                        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        Voltar ao catálogo
                    </button>
                    <span class="eyebrow">${produto.categoria}</span>
                    <h2>${produto.nome}</h2>
                    <p>${produto.detalhes}</p>
                    <dl class="summary-list">
                        <div><dt>Preço</dt><dd>${formatCurrency(produto.preco)}</dd></div>
                        <div><dt>Status</dt><dd>${produto.disponibilidade ? "Disponível" : "Indisponível"}</dd></div>
                    </dl>
                    <button class="btn btn-primary" data-action="add-cart" data-id="${produto.id}" ${produto.disponibilidade ? "" : "disabled"}>
                        <i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>
                        Adicionar ao carrinho
                    </button>
                </div>
            </section>
        `;
    },

    encomenda() {
        const opcoes = SGP_DATA.opcoesEncomenda;

        return `
            <section class="page-layout narrow">
                <div class="section-heading">
                    <h2>Encomenda personalizada</h2>
                    <p>Configure um bolo sob encomenda. O preço é estimado para fins de protótipo.</p>
                </div>
                <form id="encomenda-form" class="form-card" novalidate>
                    <div class="form-grid">
                        ${selectField("formato", "Formato", opcoes.formatos)}
                        ${selectField("tamanho", "Tamanho", opcoes.tamanhos.map((item) => item.nome))}
                        ${selectField("recheio", "Recheio", opcoes.recheios)}
                        ${selectField("cobertura", "Cobertura", opcoes.coberturas)}
                    </div>
                    <label>
                        Mensagem no bolo
                        <input type="text" name="mensagem" placeholder="Ex.: Feliz aniversário, Sofia">
                    </label>
                    <label>
                        Observações
                        <textarea name="observacoes" rows="4" placeholder="Descreva cores, ingredientes que deseja retirar ou detalhes de decoração"></textarea>
                    </label>
                    <label>
                        Imagem de referência
                        <input type="file" name="referencia" accept="image/*">
                        <small id="file-feedback">Upload simulado: o arquivo não será enviado.</small>
                    </label>
                    <div class="order-estimate">
                        <span>Preço estimado</span>
                        <strong id="custom-price">${formatCurrency(75)}</strong>
                    </div>
                    <button class="btn btn-primary full-width" type="submit">
                        <i class="fa-solid fa-plus" aria-hidden="true"></i>
                        Adicionar encomenda ao carrinho
                    </button>
                </form>
            </section>
        `;
    },

    carrinho() {
        const itens = AppState.carrinho.map((item) => `
            <article class="cart-item">
                <div>
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    ${item.personalizacao ? `<small>${item.personalizacao}</small>` : ""}
                </div>
                <div class="quantity-control" aria-label="Quantidade">
                    <button data-action="cart-minus" data-key="${item.key}">-</button>
                    <span>${item.quantidade}</span>
                    <button data-action="cart-plus" data-key="${item.key}">+</button>
                </div>
                <strong>${formatCurrency(item.preco * item.quantidade)}</strong>
                <button class="icon-button danger" data-action="cart-remove" data-key="${item.key}" aria-label="Remover ${item.nome}">
                    <i class="fa-solid fa-trash" aria-hidden="true"></i>
                </button>
            </article>
        `).join("");

        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Carrinho</h2>
                    <p>Revise itens, ajuste quantidades e avance para entrega ou retirada.</p>
                </div>
                ${AppState.carrinho.length ? `
                    <div class="cart-layout">
                        <div class="cart-list">${itens}</div>
                        <aside class="checkout-card">
                            <h3>Resumo</h3>
                            <dl class="summary-list">
                                <div><dt>Itens</dt><dd>${cartQuantity()}</dd></div>
                                <div><dt>Subtotal</dt><dd>${formatCurrency(cartTotal())}</dd></div>
                                <div><dt>Taxa simulada</dt><dd>${formatCurrency(0)}</dd></div>
                                <div class="total"><dt>Total</dt><dd>${formatCurrency(cartTotal())}</dd></div>
                            </dl>
                            <button class="btn btn-primary full-width" data-action="go" data-route="entrega">
                                Avançar
                            </button>
                        </aside>
                    </div>
                ` : emptyState("Seu carrinho está vazio.", "Adicione produtos do catálogo ou crie uma encomenda personalizada.")}
            </section>
        `;
    },

    entrega() {
        return `
            <section class="page-layout narrow">
                <div class="section-heading">
                    <h2>Entrega ou retirada</h2>
                    <p>Escolha como o pedido será recebido. As informações ficam apenas no protótipo.</p>
                </div>
                <form id="entrega-form" class="form-card" novalidate>
                    <div class="segmented-control">
                        <label><input type="radio" name="tipoEntrega" value="Retirada" checked> Retirada na loja</label>
                        <label><input type="radio" name="tipoEntrega" value="Entrega"> Entrega</label>
                    </div>
                    <div class="form-grid">
                        <label>
                            Data
                            <input type="date" name="data" required>
                            <small data-error-for="data"></small>
                        </label>
                        <label>
                            Horário
                            <input type="time" name="horario" required>
                            <small data-error-for="horario"></small>
                        </label>
                    </div>
                    <label>
                        Endereço, se for entrega
                        <input type="text" name="endereco" placeholder="Rua, número, bairro">
                    </label>
                    <label>
                        <input type="checkbox" name="recorrente" value="sim">
                        Marcar como recorrente
                    </label>
                    <label>
                        Periodicidade
                        <select name="frequenciaRecorrencia" disabled>
                            <option value="Semanal">Semanal</option>
                            <option value="Quinzenal">Quinzenal</option>
                            <option value="Mensal">Mensal</option>
                        </select>
                    </label>
                    <button class="btn btn-primary full-width" type="submit">Continuar para pagamento</button>
                </form>
            </section>
        `;
    },

    pagamento() {
        const isEntrega = AppState.entrega && AppState.entrega.tipoEntrega === "Entrega";
        return `
            <section class="page-layout narrow">
                <div class="section-heading">
                    <h2>Pagamento simulado</h2>
                    <p>Selecione uma forma de pagamento. Nenhuma transação real será realizada.</p>
                </div>
                <form id="pagamento-form" class="form-card">
                    <div class="payment-options">
                        ${["Pix", "Cartão de crédito", "Dinheiro na retirada"].map((opcao, index) => `
                            <label>
                                <input type="radio" name="pagamento" value="${opcao}" ${index === 0 ? "checked" : ""} ${isEntrega && opcao === "Dinheiro na retirada" ? "disabled" : ""}>
                                <span>${opcao}</span>
                            </label>
                        `).join("")}
                    </div>
                    ${isEntrega ? `
                        <div class="notice">
                            <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
                            <span>Dinheiro na retirada so esta disponivel para pedidos com retirada na loja.</span>
                        </div>
                    ` : ""}
                    <div class="notice">
                        <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
                        <span>Ambiente visual de demonstração. Segurança e criptografia são registradas como requisito, não implementadas neste protótipo.</span>
                    </div>
                    <button class="btn btn-primary full-width" type="submit">Confirmar pedido</button>
                </form>
            </section>
        `;
    },

    confirmacao() {
        const pedido = AppState.ultimoPedido;

        return `
            <section class="page-layout narrow">
                <div class="confirmation-panel">
                    <span class="status-icon"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
                    <span class="eyebrow">Pedido confirmado</span>
                    <h2>${pedido ? pedido.id : "PED-0000"}</h2>
                    <p>O pedido foi registrado no protótipo e já aparece na área de status e no painel do gerente.</p>
                    <dl class="summary-list">
                        <div><dt>Total</dt><dd>${formatCurrency(pedido ? pedido.total : 0)}</dd></div>
                        <div><dt>Recebimento</dt><dd>${pedido ? pedido.tipoEntrega : "Retirada"}</dd></div>
                        <div><dt>Recorrencia</dt><dd>${recurrenceLabel(pedido)}</dd></div>
                        <div><dt>Status</dt><dd>Recebido</dd></div>
                    </dl>
                    <div class="hero-actions">
                        <button class="btn btn-primary" data-action="go" data-route="status">Acompanhar status</button>
                        <button class="btn btn-secondary" data-action="go" data-route="catalogo">Voltar ao catálogo</button>
                    </div>
                </div>
            </section>
        `;
    },

    status() {
        const usuarioLogado = AppState.usuarioLogado;
        const pedidosUsuario = usuarioLogado
            ? SGP_DATA.pedidos.filter((pedido) => pedido.clienteEmail === usuarioLogado.email)
            : [];

        const statusCards = pedidosUsuario.map((pedido) => {
            const etapas = orderStatusSteps(pedido);
            const statusAtual = etapas.includes(pedido.status) ? etapas.indexOf(pedido.status) : 0;

            return `
                <div class="status-card">
                    <div class="status-header">
                        <div>
                            <strong>${pedido.id}</strong>
                            <small>${recurrenceLabel(pedido)}</small>
                            <span>${pedido.cliente || "Cliente do protótipo"}</span>
                        </div>
                        <span class="badge success">${pedido.status}</span>
                    </div>
                    <div class="timeline">
                        ${etapas.map((etapa, index) => `
                            <div class="timeline-step ${index <= statusAtual ? "done" : ""}">
                                <span>${index + 1}</span>
                                <strong>${etapa}</strong>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
        }).join("");

        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Status dos pedidos</h2>
                    <p>Acompanhe apenas os pedidos vinculados ao usuário logado.</p>
                </div>
                ${usuarioLogado
                    ? statusCards || emptyState("Nenhum pedido encontrado.", "Faça uma compra ou encomenda para acompanhar o status por aqui.")
                    : emptyState("Entre para acompanhar seus pedidos.", "O status mostra somente os pedidos do usuário logado.")}
            </section>
        `;
    },

    dashboard() {
        const estoqueCritico = SGP_DATA.insumos.filter((insumo) => insumo.quantidade <= insumo.nivelCritico);
        const pedidosPendentes = SGP_DATA.pedidos.filter((pedido) => pedido.status !== "Finalizado");

        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Painel do gerente</h2>
                    <p>Resumo administrativo para monitorar pedidos, catálogo e estoque.</p>
                </div>
                <div class="metric-grid">
                    ${metricCard("Pedidos ativos", pedidosPendentes.length, "fa-clipboard-list")}
                    ${metricCard("Produtos disponíveis", SGP_DATA.produtos.filter((produto) => produto.disponibilidade).length, "fa-bread-slice")}
                    ${metricCard("Alertas de estoque", estoqueCritico.length, "fa-triangle-exclamation")}
                    ${metricCard("Receita simulada", formatCurrency(SGP_DATA.pedidos.reduce((total, pedido) => total + pedido.total, 0)), "fa-chart-simple")}
                </div>
                <div class="admin-grid">
                    <section class="admin-panel">
                        <div class="panel-heading">
                            <h3>Pedidos recentes</h3>
                            <button class="btn btn-ghost" data-action="go" data-route="pedidos">Ver todos</button>
                        </div>
                        ${ordersTable(SGP_DATA.pedidos.slice(0, 3))}
                    </section>
                    <section class="admin-panel">
                        <div class="panel-heading">
                            <h3>Insumos críticos</h3>
                            <button class="btn btn-ghost" data-action="go" data-route="estoque">Abrir estoque</button>
                        </div>
                        ${estoqueCritico.length ? estoqueCritico.map((insumo) => stockRow(insumo)).join("") : emptyState("Sem alertas.", "Todos os insumos estão acima do nível crítico.")}
                    </section>
                </div>
            </section>
        `;
    },

    pedidos() {
        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Gestão de pedidos</h2>
                    <p>Visualize pedidos e altere o status para demonstrar o fluxo administrativo.</p>
                </div>
                <section class="admin-panel">${ordersTable(SGP_DATA.pedidos, true)}</section>
            </section>
        `;
    },

    produtos() {
        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Gestão de produtos</h2>
                    <p>Cadastro e disponibilidade são simulados para demonstrar o uso pelo gerente.</p>
                </div>
                <div class="admin-panel">
                    <div class="panel-heading">
                        <h3>Produtos cadastrados</h3>
                        <button class="btn btn-primary" data-action="simulate-save">
                            <i class="fa-solid fa-plus" aria-hidden="true"></i>
                            Novo produto
                        </button>
                    </div>
                    <div class="table-wrap">
                        <table>
                            <thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Status</th><th>Ação</th></tr></thead>
                            <tbody>
                                ${SGP_DATA.produtos.map((produto) => `
                                    <tr>
                                        <td>${produto.nome}</td>
                                        <td>${produto.categoria}</td>
                                        <td>${priceControl(produto.id, produto.preco, `Preço de ${produto.nome}`)}</td>
                                        <td>${inventoryControl("produto", produto.id, produto.estoque, "un", `Estoque de ${produto.nome}`)}</td>
                                        <td><span class="badge ${produto.disponibilidade ? "success" : "danger"}">${produto.disponibilidade ? "Disponível" : "Esgotado"}</span></td>
                                        <td><button class="btn btn-ghost" data-action="toggle-product" data-id="${produto.id}">${produto.disponibilidade ? "Indisponibilizar" : "Disponibilizar"}</button></td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    },

    estoque() {
        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Estoque de insumos</h2>
                    <p>Itens abaixo do nível crítico são destacados para apoiar a gestão da panificadora.</p>
                </div>
                <div class="admin-panel">
                    ${SGP_DATA.insumos.map((insumo) => stockRow(insumo, true)).join("")}
                </div>
            </section>
        `;
    },

    relatorios() {
        const dataFim = new Date().toISOString().slice(0, 10);
        const dataInicioBase = new Date();
        dataInicioBase.setDate(dataInicioBase.getDate() - 7);
        const dataInicio = dataInicioBase.toISOString().slice(0, 10);

        return `
            <section class="page-layout">
                <div class="section-heading">
                    <h2>Relatorios</h2>
                    <p>Gere arquivos com os dados atuais de estoque, produtos, pedidos e encomendas do prototipo.</p>
                </div>
                <form id="relatorio-form" class="form-card">
                    <div class="form-grid">
                        <label>
                            Tipo de relatorio
                            <select name="tipoRelatorio">
                                <option value="estoque-vendas">Estoque, produtos e vendas (CSV)</option>
                                <option value="encomendas">Encomendas personalizadas (HTML imprimivel)</option>
                            </select>
                        </label>
                        <label>
                            Data inicial
                            <input type="date" name="dataInicio" value="${dataInicio}">
                        </label>
                        <label>
                            Data final
                            <input type="date" name="dataFim" value="${dataFim}">
                        </label>
                    </div>
                    <div class="hero-actions">
                        <button class="btn btn-primary" type="button" data-action="report-download">
                            <i class="fa-solid fa-download" aria-hidden="true"></i>
                            Baixar relatorio
                        </button>
                        <button class="btn btn-secondary" type="button" data-action="report-preview">
                            <i class="fa-solid fa-eye" aria-hidden="true"></i>
                            Visualizar
                        </button>
                    </div>
                </form>
            </section>
        `;
    }
};

function selectField(name, label, options) {
    return `
        <label>
            ${label}
            <select name="${name}" required>
                ${options.map((opcao) => `<option value="${opcao}">${opcao}</option>`).join("")}
            </select>
        </label>
    `;
}

function metricCard(label, value, icon) {
    return `
        <article class="metric-card">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>
            <strong>${value}</strong>
            <span>${label}</span>
        </article>
    `;
}

function ordersTable(pedidos, editable = false) {
    return `
        <div class="table-wrap">
            <table>
                <thead>
                    <tr><th>Pedido</th><th>Cliente</th><th>Tipo</th><th>Recorrencia</th><th>Total</th><th>Status</th>${editable ? "<th>Ação</th>" : ""}</tr>
                </thead>
                <tbody>
                    ${pedidos.map((pedido) => `
                        <tr>
                            <td>${pedido.id}</td>
                            <td>${pedido.cliente}</td>
                            <td>${pedido.tipo}</td>
                            <td>${recurrenceLabel(pedido)}</td>
                            <td>${formatCurrency(pedido.total)}</td>
                            <td><span class="badge info">${pedido.status}</span></td>
                            ${editable ? `
                                <td>
                                    <select data-action="status-change" data-id="${pedido.id}" aria-label="Alterar status do pedido ${pedido.id}">
                                        ${orderStatusSteps(pedido).map((status) => `
                                            <option value="${status}" ${pedido.status === status ? "selected" : ""}>${status}</option>
                                        `).join("")}
                                    </select>
                                </td>
                            ` : ""}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function orderStatusSteps(pedido) {
    const finalizacao = pedido.tipoEntrega === "Entrega" ? "Saiu para entrega" : "Pronto para retirada";
    return ["Recebido", "Em preparo", finalizacao, "Finalizado"];
}

function recurrenceLabel(pedido) {
    if (!pedido || !pedido.recorrencia || !pedido.recorrencia.ativa) {
        return "Pedido unico";
    }

    return `Recorrente (${pedido.recorrencia.frequencia})`;
}

function stockRow(insumo, detailed = false) {
    const critico = insumo.quantidade <= insumo.nivelCritico;

    return `
        <article class="stock-row ${critico ? "critical" : ""}">
            <div>
                <h3>${insumo.nome}</h3>
                <p>${detailed ? `Fornecedor: ${insumo.fornecedor}` : `Nível crítico: ${insumo.nivelCritico} ${insumo.unidade}`}</p>
            </div>
            ${detailed
                ? inventoryControl("insumo", insumo.id, insumo.quantidade, insumo.unidade, `Quantidade de ${insumo.nome}`)
                : `<strong>${insumo.quantidade} ${insumo.unidade}</strong>`}
            <span class="badge ${critico ? "danger" : "success"}">${critico ? "Crítico" : "Adequado"}</span>
        </article>
    `;
}

function inventoryControl(kind, id, value, unit, label) {
    return `
        <div class="admin-quantity-control" aria-label="${label}">
            <input
                type="number"
                min="0"
                step="1"
                value="${value}"
                data-action="inventory-change"
                data-kind="${kind}"
                data-id="${id}"
                aria-label="${label}"
            >
            <span>${unit}</span>
        </div>
    `;
}

function priceControl(id, value, label) {
    return `
        <label class="admin-price-control">
            <span>R$</span>
            <input
                type="number"
                min="0"
                step="0.01"
                value="${Number(value).toFixed(2)}"
                data-action="price-change"
                data-id="${id}"
                aria-label="${label}"
            >
        </label>
    `;
}

function emptyState(title, text) {
    return `
        <div class="empty-state">
            <strong>${title}</strong>
            <p>${text}</p>
        </div>
    `;
}
