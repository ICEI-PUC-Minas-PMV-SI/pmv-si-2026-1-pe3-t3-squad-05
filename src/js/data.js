const SGP_DATA = {
    usuarioAtual: {
        nome: "Visitante",
        perfil: "Visitante"
    },

    usuarios: [
        {
            id: 1,
            nome: "Marina Duarte",
            cpf: "123.456.789-09",
            dataNascimento: "1990-05-12",
            email: "marina@email.com",
            telefone: "(31) 99999-0101",
            endereco: "Rua das Flores, 120, Savassi",
            perfil: "Cliente"
        },
        {
            id: 2,
            nome: "Carlos Menezes",
            cpf: "529.982.247-25",
            dataNascimento: "1982-11-04",
            email: "gerente@sgp.com",
            telefone: "(31) 98888-0202",
            endereco: "Avenida Central, 450, Centro",
            perfil: "Gerente"
        },
        {
            id: 3,
            nome: "Atendente SGP",
            cpf: "935.411.347-80",
            dataNascimento: "1995-03-18",
            email: "atendente@sgp.com",
            telefone: "(31) 97777-0303",
            endereco: "Rua do Atendimento, 88, Centro",
            perfil: "Atendente"
        },
        {
            id: 4,
            nome: "Confeiteiro SGP",
            cpf: "222.333.444-05",
            dataNascimento: "1991-09-10",
            email: "confeiteiro@sgp.com",
            telefone: "(31) 96666-0404",
            endereco: "Rua da Confeitaria, 42, Funcionarios",
            perfil: "Confeiteiro/Padeiro"
        }
    ],

    produtos: [
        {
            id: 101,
            nome: "Pão Artesanal",
            descricao: "Pão de fermentação curta, assado em fornadas frequentes durante a manhã.",
            detalhes: "Indicado para consumo imediato. Produto com controle de disponibilidade por fornada.",
            preco: 0.75,
            categoria: "Padaria",
            imagem: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=900&q=80",
            disponibilidade: true,
            estoque: 180
        },
        {
            id: 102,
            nome: "Bolo de Cenoura",
            descricao: "Massa macia com cobertura de chocolate e porções para até oito pessoas.",
            detalhes: "Produto pronto do catálogo, com baixa automática simulada após a finalização do pedido.",
            preco: 32.9,
            categoria: "Confeitaria",
            imagem: "https://lodivino.com.br/images/receitas/bolo-de-cenoura.jpg",
            disponibilidade: true,
            estoque: 12
        },
        {
            id: 103,
            nome: "Croissant Amanteigado",
            descricao: "Massa folhada com manteiga, produzido em lote limitado.",
            detalhes: "Item indisponível no momento para demonstrar feedback de disponibilidade no protótipo.",
            preco: 8.5,
            categoria: "Salgados",
            imagem: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
            disponibilidade: false,
            estoque: 0
        },
        {
            id: 104,
            nome: "Torta de Frango",
            descricao: "Torta salgada com recheio cremoso e massa leve.",
            detalhes: "Produto padronizado para retirada ou entrega agendada.",
            preco: 46.0,
            categoria: "Salgados",
            imagem: "https://lodivino.com.br/images/receitas/torta-de-frango.jpg",
            disponibilidade: true,
            estoque: 8
        },
        {
            id: 105,
            nome: "Kit Café da Tarde",
            descricao: "Seleção com pães, bolo simples, biscoitos e suco natural.",
            detalhes: "Kit pré-pronto definido pela gerência para pedidos rápidos.",
            preco: 59.9,
            categoria: "Kits",
            imagem: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
            disponibilidade: true,
            estoque: 6
        },
        {
            id: 106,
            nome: "Brigadeiros Sortidos",
            descricao: "Caixa com brigadeiros tradicionais, chocolate branco e granulado.",
            detalhes: "Produto de confeitaria com quantidade limitada por dia.",
            preco: 28.0,
            categoria: "Confeitaria",
            imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Brigadeiro.jpg?width=900",
            disponibilidade: true,
            estoque: 18
        }
    ],

    insumos: [
        { id: 1, nome: "Farinha de trigo", quantidade: 42, unidade: "kg", nivelCritico: 10, fornecedor: "Moinho Central" },
        { id: 2, nome: "Açúcar refinado", quantidade: 7, unidade: "kg", nivelCritico: 8, fornecedor: "Doce Minas" },
        { id: 3, nome: "Ovos", quantidade: 96, unidade: "un", nivelCritico: 30, fornecedor: "Granja Vale" },
        { id: 4, nome: "Chocolate em pó", quantidade: 4, unidade: "kg", nivelCritico: 6, fornecedor: "Cacau Forte" },
        { id: 5, nome: "Fermento biológico", quantidade: 12, unidade: "kg", nivelCritico: 5, fornecedor: "Panisupply" }
    ],

    pedidos: [
        {
            id: "PED-2401",
            cliente: "Marina Duarte",
            clienteEmail: "marina@email.com",
            tipo: "Compra comum",
            data: "05/05/2026",
            horario: "10:30",
            total: 41.4,
            status: "Saiu para entrega",
            tipoEntrega: "Entrega",
            recorrencia: { ativa: false, frequencia: null },
            itens: ["Bolo de Cenoura", "Brigadeiros Sortidos"]
        },
        {
            id: "PED-2402",
            cliente: "Rafael Nogueira",
            clienteEmail: "rafael@email.com",
            tipo: "Encomenda personalizada",
            data: "06/05/2026",
            horario: "16:00",
            total: 125.0,
            status: "Pronto para retirada",
            tipoEntrega: "Retirada",
            recorrencia: { ativa: true, frequencia: "Semanal" },
            itens: ["Bolo redondo 2kg, recheio de brigadeiro"]
        },
        {
            id: "PED-2403",
            cliente: "Fernanda Reis",
            clienteEmail: "fernanda@email.com",
            tipo: "Compra comum",
            data: "05/05/2026",
            horario: "17:30",
            total: 59.9,
            status: "Pronto para retirada",
            tipoEntrega: "Retirada",
            recorrencia: { ativa: false, frequencia: null },
            itens: ["Kit Café da Tarde"]
        }
    ],

    categorias: ["Todos", "Padaria", "Confeitaria", "Salgados", "Kits"],

    opcoesEncomenda: {
        formatos: ["Redondo", "Retangular", "Quadrado"],
        tamanhos: [
            { nome: "1 kg", preco: 75 },
            { nome: "2 kg", preco: 125 },
            { nome: "3 kg", preco: 175 }
        ],
        recheios: ["Brigadeiro", "Doce de leite", "Ninho", "Morango"],
        coberturas: ["Chocolate", "Chantilly", "Ganache", "Glacê"]
    }
};
