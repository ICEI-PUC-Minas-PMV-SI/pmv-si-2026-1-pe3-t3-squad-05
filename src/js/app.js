const AppState = {
    route: "home",
    routeParam: null,
    carrinho: [],
    filtroCategoria: "Todos",
    busca: "",
    restoreSearchFocus: false,
    entrega: null,
    ultimoPedido: null,
    usuarioLogado: null,
    redirectAfterAuth: null
};

const API_BASE_URL = "http://localhost:3000";
const USER_PROFILES = ["Visitante", "Cliente", "Gerente", "Atendente", "Confeiteiro/Padeiro"];
const ROUTE_PERMISSIONS = {
    dashboard: ["Gerente"],
    produtos: ["Gerente"],
    pedidos: ["Gerente", "Atendente", "Confeiteiro/Padeiro"],
    estoque: ["Gerente", "Confeiteiro/Padeiro"],
    relatorios: ["Gerente", "Atendente", "Confeiteiro/Padeiro"]
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

    if (action === "logout") {
        logout();
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
        if (!ensureActionAllowed("produtos")) return;
        toggleProduct(Number(target.dataset.id));
    }

    if (action === "inventory-step") {
        if (!ensureActionAllowed("estoque")) return;
        updateInventoryQuantity(target.dataset.kind, Number(target.dataset.id), Number(target.dataset.delta));
    }

    if (action === "inventory-change") {
        target.select();
    }

    if (action === "price-change") {
        if (!ensureActionAllowed("produtos")) return;
        target.select();
    }

    if (action === "simulate-save") {
        showToast("Ação simulada registrada no protótipo.", "success");
    }

    if (action === "report-download" || action === "report-preview") {
        if (!ensureActionAllowed("relatorios")) return;
        handleReportAction(action === "report-download" ? "download" : "preview");
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
    if (event.target.name === "recorrente") {
        const recurrenceSelect = event.target.form.elements.frequenciaRecorrencia;
        if (recurrenceSelect) recurrenceSelect.disabled = !event.target.checked;
    }

    const statusSelect = event.target.closest("[data-action='status-change']");
    if (statusSelect) {
        if (!ensureActionAllowed("pedidos")) return;
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

    const inventoryInput = event.target.closest("[data-action='inventory-change']");
    if (inventoryInput) {
        if (!ensureActionAllowed("estoque")) return;
        setInventoryQuantity(inventoryInput.dataset.kind, Number(inventoryInput.dataset.id), Number(inventoryInput.value));
    }

    const priceInput = event.target.closest("[data-action='price-change']");
    if (priceInput) {
        if (!ensureActionAllowed("produtos")) return;
        setProductPrice(Number(priceInput.dataset.id), Number(priceInput.value));
    }
});

document.addEventListener("submit", (event) => {
    if (event.target.id === "login-form") {
        event.preventDefault();
        submitLogin(event.target);
    }

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
    const requestedRoute = route && Router[route] ? route : "home";
    AppState.route = getAuthorizedRoute(requestedRoute, param);
    AppState.routeParam = AppState.route === requestedRoute ? param : null;

    if (updateHash) {
        const hash = param ? `#${AppState.route}/${param}` : `#${AppState.route}`;
        if (window.location.hash !== hash) {
            window.location.hash = hash;
            return;
        }
    } else if (AppState.route !== requestedRoute) {
        const hash = AppState.routeParam ? `#${AppState.route}/${AppState.routeParam}` : `#${AppState.route}`;
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

function getAuthorizedRoute(route, param = null) {
    if (canAccessRoute(route)) return route;

    if (!getUsuarioLogado()) {
        AppState.redirectAfterAuth = { route, param };
        showToast("Entre com um perfil autorizado para acessar esta area.", "error");
        return "login";
    }

    showToast("Seu perfil nao tem permissao para acessar esta area.", "error");
    return "acessoNegado";
}

function canAccessRoute(route) {
    const allowedProfiles = ROUTE_PERMISSIONS[route];
    if (!allowedProfiles) return true;
    return allowedProfiles.includes(getCurrentProfile());
}

function ensureActionAllowed(route) {
    if (canAccessRoute(route)) return true;
    showToast("Seu perfil nao tem permissao para esta acao.", "error");
    return false;
}

function getCurrentProfile() {
    const usuarioLogado = getUsuarioLogado();
    return usuarioLogado && USER_PROFILES.includes(usuarioLogado.perfil)
        ? usuarioLogado.perfil
        : "Visitante";
}

function markActiveRoute() {
    document.querySelectorAll("[data-route]").forEach((link) => {
        link.classList.toggle("active", link.dataset.route === AppState.route);
    });
}

function updateNavigationAccess() {
    let hasVisibleAdminLink = false;

    document.querySelectorAll(".app-nav [data-route]").forEach((link) => {
        const route = link.dataset.route;
        const isAdminRoute = Boolean(ROUTE_PERMISSIONS[route]);
        const isAllowed = canAccessRoute(route);

        link.hidden = isAdminRoute && !isAllowed;
        link.style.display = link.hidden ? "none" : "";
        if (isAdminRoute && isAllowed) {
            hasVisibleAdminLink = true;
        }
    });

    const separator = document.querySelector("[data-admin-separator]");
    if (separator) {
        separator.hidden = !hasVisibleAdminLink;
        separator.style.display = separator.hidden ? "none" : "";
    }
}

function updateHeader() {
    const greeting = document.getElementById("user-greeting");
    const authAction = document.getElementById("auth-action");
    const count = document.getElementById("cart-count");
    const usuarioLogado = getUsuarioLogado();

    if (greeting) {
        greeting.textContent = usuarioLogado
            ? `${usuarioLogado.nome} (${usuarioLogado.perfil})`
            : "Visitante";
    }

    if (authAction) {
        const icon = authAction.querySelector("i");
        const label = authAction.querySelector("span");

        authAction.dataset.action = usuarioLogado ? "logout" : "go";
        authAction.dataset.route = usuarioLogado ? "" : "login";
        authAction.href = usuarioLogado ? "#home" : "#login";
        authAction.setAttribute("aria-label", usuarioLogado ? "Sair do sistema" : "Entrar no sistema");

        if (icon) {
            icon.className = `fa-solid ${usuarioLogado ? "fa-right-from-bracket" : "fa-right-to-bracket"}`;
        }

        if (label) {
            label.textContent = usuarioLogado ? "Sair" : "Entre";
        }
    }

    if (count) {
        count.textContent = cartQuantity();
    }

    updateNavigationAccess();
}

function getUsuarioLogado() {
    return AppState.usuarioLogado;
}

function setUsuarioLogado(usuario) {
    AppState.usuarioLogado = usuario;
    SGP_DATA.usuarioAtual = usuario || { nome: "Visitante", perfil: "Visitante" };
}

function logout() {
    setUsuarioLogado(null);
    AppState.carrinho = [];
    AppState.entrega = null;
    AppState.ultimoPedido = null;
    AppState.redirectAfterAuth = null;
    showToast("Sessão encerrada.", "success");
    navigateTo("home");
}

function redirectAfterAuth(defaultRoute = "catalogo") {
    const redirect = AppState.redirectAfterAuth;
    AppState.redirectAfterAuth = null;
    navigateTo(redirect ? redirect.route : defaultRoute, redirect ? redirect.param : null);
}

function handleReportAction(mode) {
    const form = document.getElementById("relatorio-form");
    if (!form) return;

    const filters = getReportFilters(form);
    if (filters.dataInicio && filters.dataFim && filters.dataInicio > filters.dataFim) {
        showToast("A data inicial deve ser anterior ou igual a data final.", "error");
        return;
    }

    const output = mode === "preview" ? "html" : filters.tipo === "encomendas" ? "html" : "csv";
    const report = generateReport(filters, output);
    if (mode === "download") {
        downloadReport(report);
        showToast("Relatorio gerado para download.", "success");
        return;
    }

    previewReport(report);
    showToast("Relatorio aberto para visualizacao.", "success");
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

async function submitLogin(form) {
    clearFormErrors(form);
    const formData = new FormData(form);
    const email = formData.get("email").trim();
    const senha = formData.get("senha").trim();
    let valid = true;

    if (!isValidEmail(email)) valid = setFieldError(form, "email", "Informe um e-mail válido.");
    if (!senha) valid = setFieldError(form, "senha", "Informe sua senha.");

    if (!valid) {
        showToast("Revise os campos destacados.", "error");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
            showToast(result.message || "E-mail ou senha inválidos.", "error");
            return;
        }

        setUsuarioLogado(result.user || { nome: email, email, perfil: "Cliente" });
        updateHeader();
        showToast(result.message || "Login realizado com sucesso.", "success");
        redirectAfterAuth();
    } catch (error) {
        showToast("Não foi possível conectar ao servidor.", "error");
    }
}

async function submitCadastro(form) {
    clearFormErrors(form);
    const formData = new FormData(form);
    const nome = formData.get("nome").trim();
    const cpf = formData.get("cpf").trim();
    const dataNascimento = formData.get("dataNascimento");
    const email = formData.get("email").trim();
    const telefone = formData.get("telefone").trim();
    const senha = formData.get("senha").trim();
    const perfil = formData.get("perfil");
    let valid = true;

    if (nome.length < 3) valid = setFieldError(form, "nome", "Informe o nome completo.");
    if (!isValidCpf(cpf)) valid = setFieldError(form, "cpf", "Informe um CPF valido no formato 000.000.000-00.");
    if (!isValidBirthDate(dataNascimento)) valid = setFieldError(form, "dataNascimento", "Informe uma data de nascimento valida.");
    if (!isValidEmail(email)) valid = setFieldError(form, "email", "Informe um e-mail válido.");
    if (telefone.length < 10) valid = setFieldError(form, "telefone", "Informe um telefone para contato.");
    if (senha.length < 4) valid = setFieldError(form, "senha", "Informe uma senha com pelo menos 4 caracteres.");
    if (!isValidProfile(perfil)) valid = setFieldError(form, "perfil", "Selecione um perfil valido.");

    if (!valid) {
        showToast("Revise os campos destacados.", "error");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, cpf, dataNascimento, email, telefone, senha, perfil })
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
            showToast(result.message || "Não foi possível criar o cadastro.", "error");
            return;
        }

        setUsuarioLogado({ nome, email, perfil });
        updateHeader();
        showToast(result.message || "Cadastro criado com sucesso.", "success");
        redirectAfterAuth();
    } catch (error) {
        showToast("Não foi possível conectar ao servidor.", "error");
    }
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
    const recorrente = formData.get("recorrente") === "sim";
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
        endereco: formData.get("endereco"),
        recorrencia: {
            ativa: recorrente,
            frequencia: recorrente ? formData.get("frequenciaRecorrencia") || "Semanal" : null
        }
    };

    showToast("Agendamento registrado no protótipo.", "success");
    navigateTo("pagamento");
}

function submitPagamento(form) {
    if (!getUsuarioLogado()) {
        AppState.redirectAfterAuth = {
            route: AppState.route,
            param: AppState.routeParam
        };
        showToast("Entre com sua conta para finalizar o pedido.", "error");
        navigateTo("login");
        return;
    }

    const formData = new FormData(form);
    const pagamento = formData.get("pagamento");
    const tipoEntrega = AppState.entrega ? AppState.entrega.tipoEntrega : "Retirada";

    if (tipoEntrega === "Entrega" && pagamento === "Dinheiro na retirada") {
        showToast("Dinheiro na retirada so e permitido para pedidos com retirada na loja.", "error");
        return;
    }

    const usuarioLogado = getUsuarioLogado();
    const recorrencia = AppState.entrega
        ? AppState.entrega.recorrencia
        : { ativa: false, frequencia: null };
    const pedido = {
        id: `PED-${Math.floor(3000 + Math.random() * 6000)}`,
        cliente: usuarioLogado ? usuarioLogado.nome : SGP_DATA.usuarioAtual.nome,
        clienteEmail: usuarioLogado ? usuarioLogado.email : null,
        tipo: AppState.carrinho.some((item) => item.tipo === "Encomenda personalizada") ? "Encomenda personalizada" : "Compra comum",
        data: new Date().toLocaleDateString("pt-BR"),
        horario: AppState.entrega ? AppState.entrega.horario : "--:--",
        total: cartTotal(),
        status: "Recebido",
        tipoEntrega,
        pagamento,
        recorrencia,
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

function updateInventoryQuantity(kind, id, delta) {
    const item = findInventoryItem(kind, id);
    if (!item) return;
    const currentValue = kind === "produto" ? item.estoque : item.quantidade;
    setInventoryQuantity(kind, id, currentValue + delta);
}

function setInventoryQuantity(kind, id, value) {
    const item = findInventoryItem(kind, id);
    if (!item) return;

    const quantity = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));

    if (kind === "produto") {
        item.estoque = quantity;
        if (quantity === 0) {
            item.disponibilidade = false;
        } else if (!item.disponibilidade) {
            item.disponibilidade = true;
        }
        showToast(`Estoque de ${item.nome} atualizado para ${quantity}.`, "success");
    } else {
        item.quantidade = quantity;
        showToast(`Quantidade de ${item.nome} atualizada para ${quantity} ${item.unidade}.`, "success");
    }

    render();
}

function findInventoryItem(kind, id) {
    if (kind === "produto") {
        return SGP_DATA.produtos.find((produto) => produto.id === id);
    }

    if (kind === "insumo") {
        return SGP_DATA.insumos.find((insumo) => insumo.id === id);
    }

    return null;
}

function setProductPrice(id, value) {
    const produto = SGP_DATA.produtos.find((item) => item.id === id);
    if (!produto) return;

    const price = Math.max(0, Number.isFinite(value) ? value : 0);
    produto.preco = Math.round(price * 100) / 100;
    showToast(`Preço de ${produto.nome} atualizado para ${formatCurrency(produto.preco)}.`, "success");
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

function isValidBirthDate(dataNascimento) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) return false;

    const [year, month, day] = dataNascimento.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) return false;

    const today = new Date();
    const oldestAllowed = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    return birthDate <= today && birthDate >= oldestAllowed;
}

function isValidProfile(perfil) {
    return USER_PROFILES.filter((profile) => profile !== "Visitante").includes(perfil);
}

function isValidCpf(cpf) {
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) return false;

    const digits = cpf.replace(/\D/g, "");
    if (/^(\d)\1{10}$/.test(digits)) return false;

    const calculateDigit = (baseLength) => {
        let sum = 0;
        for (let index = 0; index < baseLength; index++) {
            sum += Number(digits[index]) * (baseLength + 1 - index);
        }

        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    return calculateDigit(9) === Number(digits[9]) && calculateDigit(10) === Number(digits[10]);
}

function createKey(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
