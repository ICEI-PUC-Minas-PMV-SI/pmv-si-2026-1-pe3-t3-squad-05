const AppState = {
    route: "home",
    routeParam: null,
    carrinho: [],
    filtroCategoria: "Todos",
    busca: "",
    restoreSearchFocus: false,
    entrega: null,
    ultimoPedido: null
};

document.addEventListener("DOMContentLoaded", () => {
    const hashRoute = normalizeRoute(window.location.hash);
    navigateTo(hashRoute.route, hashRoute.param, false);
    updateHeader();
});

window.addEventListener("hashchange", () => {
    const hashRoute = normalizeRoute(window.location.hash);
    navigateTo(hashRoute.route, hashRoute.param, false);
});

document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const action = target.dataset.action;

    if (action === "go") {
        navigateTo(target.dataset.route, target.dataset.id);
    }

    if (action === "filter") {
        AppState.filtroCategoria = target.dataset.category;
        render();
    }

    if (action === "add-cart") {
        addToCart(Number(target.dataset.id));
    }

    if (action === "cart-plus") {
        changeCartQuantity(target.dataset.key, 1);
    }

    if (action === "cart-minus") {
        changeCartQuantity(target.dataset.key, -1);
    }

    if (action === "cart-remove") {
        removeFromCart(target.dataset.key);
    }

    if (action === "toggle-product") {
        toggleProduct(Number(target.dataset.id));
    }

    if (action === "simulate-save") {
        showToast("Ação simulada registrada no protótipo.", "success");
    }
});

document.addEventListener("input", (event) => {
    if (event.target.id === "catalog-search") {
        AppState.busca = event.target.value;
        AppState.restoreSearchFocus = true;
        render();
    }

    if (event.target.closest("#encomenda-form")) {
        updateCustomOrderEstimate();
    }
});

document.addEventListener("change", (event) => {
    const statusSelect = event.target.closest("[data-action='status-change']");
    if (statusSelect) {
        const pedido = SGP_DATA.pedidos.find((item) => item.id === statusSelect.dataset.id);
        pedido.status = statusSelect.value;
        if (AppState.ultimoPedido && AppState.ultimoPedido.id === pedido.id) {
            AppState.ultimoPedido.status = statusSelect.value;
        }
        showToast(`Status do pedido ${pedido.id} atualizado.`, "success");
        render();
    }

    if (event.target.name === "referencia") {
        const feedback = document.getElementById("file-feedback");
        if (feedback) {
            feedback.textContent = event.target.files[0]
                ? `Arquivo selecionado: ${event.target.files[0].name}`
                : "Upload simulado: o arquivo não será enviado.";
        }
    }
});

document.addEventListener("submit", (event) => {
    if (event.target.id === "cadastro-form") {
        event.preventDefault();
        submitCadastro(event.target);
    }

    if (event.target.id === "encomenda-form") {
        event.preventDefault();
        submitEncomenda(event.target);
    }

    if (event.target.id === "entrega-form") {
        event.preventDefault();
        submitEntrega(event.target);
    }

    if (event.target.id === "pagamento-form") {
        event.preventDefault();
        submitPagamento(event.target);
    }
});

function navigateTo(route, param = null, updateHash = true) {
    AppState.route = route && Router[route] ? route : "home";
    AppState.routeParam = param;

    if (updateHash) {
        const hash = param ? `#${AppState.route}/${param}` : `#${AppState.route}`;
        if (window.location.hash !== hash) {
            window.location.hash = hash;
            return;
        }
    }

    render();
}

function render() {
    const main = document.getElementById("main-content");
    main.classList.add("is-changing");

    window.setTimeout(() => {
        main.innerHTML = Router[AppState.route](AppState.routeParam);
        main.classList.remove("is-changing");
        main.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
        markActiveRoute();
        updateHeader();
        updateCustomOrderEstimate();
        restoreSearchFocus();
    }, 80);
}

function normalizeRoute(hash) {
    const cleanHash = hash.replace("#", "");
    if (!cleanHash) return { route: "home", param: null };
    const [route, param] = cleanHash.split("/");
    return { route, param: param || null };
}

function markActiveRoute() {
    document.querySelectorAll("[data-route]").forEach((link) => {
        link.classList.toggle("active", link.dataset.route === AppState.route);
    });
}

function updateHeader() {
    const greeting = document.getElementById("user-greeting");
    const count = document.getElementById("cart-count");

    if (greeting) {
        greeting.textContent = `${SGP_DATA.usuarioAtual.nome} (${SGP_DATA.usuarioAtual.perfil})`;
    }

    if (count) {
        count.textContent = cartQuantity();
    }
}

function restoreSearchFocus() {
    if (!AppState.restoreSearchFocus) return;
    const search = document.getElementById("catalog-search");
    if (!search) return;
    const length = search.value.length;
    search.focus();
    search.setSelectionRange(length, length);
    AppState.restoreSearchFocus = false;
}

function submitCadastro(form) {
    clearFormErrors(form);
    const formData = new FormData(form);
    const nome = formData.get("nome").trim();
    const cpf = formData.get("cpf").trim();
    const email = formData.get("email").trim();
    const telefone = formData.get("telefone").trim();
    let valid = true;

    if (nome.length < 3) valid = setFieldError(form, "nome", "Informe o nome completo.");
    if (!isValidCpf(cpf)) valid = setFieldError(form, "cpf", "Use o formato 000.000.000-00.");
    if (!isValidEmail(email)) valid = setFieldError(form, "email", "Informe um e-mail válido.");
    if (telefone.length < 10) valid = setFieldError(form, "telefone", "Informe um telefone para contato.");

    if (!valid) {
        showToast("Revise os campos destacados.", "error");
        return;
    }

    SGP_DATA.usuarioAtual = { nome, perfil: "Cliente" };
    showToast("Cadastro simulado salvo com sucesso.", "success");
    navigateTo("catalogo");
}

function submitEncomenda(form) {
    const formData = new FormData(form);
    const tamanho = formData.get("tamanho");
    const preco = getCustomOrderPrice(tamanho);
    const descricao = `${formData.get("formato")} ${tamanho}, recheio ${formData.get("recheio")}, cobertura ${formData.get("cobertura")}`;
    const mensagem = formData.get("mensagem");

    AppState.carrinho.push({
        key: createKey("custom"),
        id: "custom",
        nome: "Encomenda personalizada",
        descricao,
        personalizacao: mensagem ? `Mensagem: ${mensagem}` : "Sem mensagem informada",
        preco,
        quantidade: 1,
        tipo: "Encomenda personalizada"
    });

    showToast("Encomenda personalizada adicionada ao carrinho.", "success");
    navigateTo("carrinho");
}

function submitEntrega(form) {
    clearFormErrors(form);
    const formData = new FormData(form);
    const data = formData.get("data");
    const horario = formData.get("horario");
    let valid = true;

    if (!data) valid = setFieldError(form, "data", "Escolha uma data.");
    if (!horario) valid = setFieldError(form, "horario", "Escolha um horário.");

    if (!valid) {
        showToast("Informe data e horário para continuar.", "error");
        return;
    }

    AppState.entrega = {
        tipoEntrega: formData.get("tipoEntrega"),
        data,
        horario,
        endereco: formData.get("endereco")
    };

    showToast("Agendamento registrado no protótipo.", "success");
    navigateTo("pagamento");
}

function submitPagamento(form) {
    const formData = new FormData(form);
    const pedido = {
        id: `PED-${Math.floor(3000 + Math.random() * 6000)}`,
        cliente: SGP_DATA.usuarioAtual.nome,
        tipo: AppState.carrinho.some((item) => item.tipo === "Encomenda personalizada") ? "Encomenda personalizada" : "Compra comum",
        data: new Date().toLocaleDateString("pt-BR"),
        horario: AppState.entrega ? AppState.entrega.horario : "--:--",
        total: cartTotal(),
        status: "Recebido",
        tipoEntrega: AppState.entrega ? AppState.entrega.tipoEntrega : "Retirada",
        pagamento: formData.get("pagamento"),
        itens: AppState.carrinho.map((item) => item.nome)
    };

    SGP_DATA.pedidos.unshift(pedido);
    AppState.ultimoPedido = pedido;
    AppState.carrinho = [];
    updateHeader();
    showToast("Pedido confirmado com sucesso.", "success");
    navigateTo("confirmacao");
}

function addToCart(produtoId) {
    const produto = SGP_DATA.produtos.find((item) => item.id === produtoId);

    if (!produto || !produto.disponibilidade) {
        showToast("Produto indisponível no momento.", "error");
        return;
    }

    const itemExistente = AppState.carrinho.find((item) => item.id === produto.id);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        AppState.carrinho.push({
            key: createKey(produto.id),
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            quantidade: 1,
            tipo: "Produto"
        });
    }

    showToast(`${produto.nome} adicionado ao carrinho.`, "success");
    updateHeader();
}

function changeCartQuantity(key, delta) {
    const item = AppState.carrinho.find((cartItem) => cartItem.key === key);
    if (!item) return;
    item.quantidade += delta;

    if (item.quantidade <= 0) {
        removeFromCart(key);
        return;
    }

    render();
}

function removeFromCart(key) {
    AppState.carrinho = AppState.carrinho.filter((item) => item.key !== key);
    showToast("Item removido do carrinho.", "success");
    render();
}

function toggleProduct(id) {
    const produto = SGP_DATA.produtos.find((item) => item.id === id);
    if (!produto) return;
    produto.disponibilidade = !produto.disponibilidade;
    showToast("Disponibilidade do produto alterada.", "success");
    render();
}

function filtrarProdutos() {
    return SGP_DATA.produtos.filter((produto) => {
        const categoryMatch = AppState.filtroCategoria === "Todos" || produto.categoria === AppState.filtroCategoria;
        const searchMatch = produto.nome.toLowerCase().includes(AppState.busca.toLowerCase())
            || produto.descricao.toLowerCase().includes(AppState.busca.toLowerCase());
        return categoryMatch && searchMatch;
    });
}

function updateCustomOrderEstimate() {
    const form = document.getElementById("encomenda-form");
    const output = document.getElementById("custom-price");
    if (!form || !output) return;
    output.textContent = formatCurrency(getCustomOrderPrice(new FormData(form).get("tamanho")));
}

function getCustomOrderPrice(tamanho) {
    const opcao = SGP_DATA.opcoesEncomenda.tamanhos.find((item) => item.nome === tamanho);
    return opcao ? opcao.preco : 75;
}

function cartQuantity() {
    return AppState.carrinho.reduce((total, item) => total + item.quantidade, 0);
}

function cartTotal() {
    return AppState.carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function showToast(message, type = "success") {
    const region = document.getElementById("toast-region");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === "success" ? "fa-check" : "fa-triangle-exclamation"}" aria-hidden="true"></i>
        <span>${message}</span>
    `;
    region.appendChild(toast);

    window.setTimeout(() => {
        toast.classList.add("leaving");
        window.setTimeout(() => toast.remove(), 250);
    }, 2800);
}

function setFieldError(form, fieldName, message) {
    const field = form.elements[fieldName];
    const error = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (field) field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
    return false;
}

function clearFormErrors(form) {
    form.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
    form.querySelectorAll("[data-error-for]").forEach((error) => {
        error.textContent = "";
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCpf(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

function createKey(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
