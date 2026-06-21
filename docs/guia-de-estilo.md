# Guia de Estilo - SGP (Sistema Gerenciador de Produtos)

Este documento descreve o **Design System** e o **Guia de Estilo** visual do protótipo de alta fidelidade do **SGP (Sistema Gerenciador de Produtos)**. Ele serve como referência para garantir a consistência estética, usabilidade, acessibilidade e conformidade ergonômica durante a evolução do sistema.

---

## 1. Paleta de Cores e Temas

O SGP utiliza um conjunto de variáveis CSS (`:root`) para gerenciar as cores. O sistema conta com duas configurações principais: o **Tema Padrão (Warm/Claro)**, que utiliza tons inspirados em panificação e café, e o **Tema de Alto Contraste (Modo Escuro)**, projetado para acessibilidade visual.

### 1.1 Tema Padrão (Light Mode)

| Variável | Representação Visual | Código Hex | Função / Aplicação |
|:---|:---:|:---|:---|
| `--bg` | █ | `#fbfaf7` | Fundo principal da aplicação (tom areia muito claro) |
| `--surface` | █ | `#ffffff` | Fundo de cards, painéis, inputs e tabelas |
| `--surface-alt` | █ | `#f3efe7` | Fundo alternativo e interações secundárias |
| `--primary` | █ | `#5f3422` | Cor primária da marca (café/marrom quente) |
| `--primary-dark` | █ | `#3f2216` | Tons mais escuros da marca, foco em botões e títulos |
| `--accent` | █ | `#c8553d` | Cor de destaque (terracota/laranja) para ações importantes |
| `--accent-soft` | █ | `#fae7df` | Fundo suave de itens selecionados e hover |
| `--wheat` | █ | `#e3b75f` | Cor amarela (trigo) utilizada para botões secundários |
| `--mint` | █ | `#3f826d` | Verde menta para estados normais ou positivos |
| `--danger` | █ | `#b3403a` | Vermelho para alertas de estoque crítico e erros |
| `--info` | █ | `#536f92` | Azul para dados complementares ou informativos |
| `--text` | █ | `#261d18` | Cor padrão de texto (marrom escuro quase preto) |
| `--muted` | █ | `#5f544e` | Cor para textos auxiliares e legendas |
| `--line` | █ | `#e5ded4` | Cor de bordas finas e divisórias |

### 1.2 Tema de Alto Contraste (Dark Mode)
Ativado adicionando a classe `.theme-high-contrast` à tag `html`. Reduz o brilho e aumenta as proporções de contraste visual.

| Variável | Representação Visual | Código Hex | Função / Aplicação |
|:---|:---:|:---|:---|
| `--bg` | █ | `#050505` | Fundo escuro absoluto |
| `--surface` | █ | `#111111` | Fundo de painéis e inputs |
| `--surface-alt` | █ | `#1d1d1d` | Fundo alternativo de tabelas e listas |
| `--primary` | █ | `#ffd84d` | Amarelo de alta visibilidade para marca e botões |
| `--accent` | █ | `#69a7ff` | Azul de destaque brilhante para links e carrinho |
| `--text` | █ | `#ffffff` | Texto em branco puro |
| `--muted` | █ | `#e6e6e6` | Texto secundário em cinza claro |
| `--line` | █ | `#f5f5f5` | Bordas de alta visibilidade |

### 1.3 Badges de Status (Alertas)

| Tipo de Status | Fundo Claro | Texto Claro | Fundo Alto Contraste | Texto Alto Contraste |
|:---|:---:|:---:|:---:|:---:|
| **Sucesso (Pronto / Ativo)** | `#d8efe5` | `#225f4f` | `#053d28` | `#a8ffd2` |
| **Perigo (Estoque Crítico / Cancelado)** | `#f9ddd9` | `#8f2d28` | `#4f0707` | `#ffd6d6` |
| **Informativo (Em preparo / Agendado)** | `#dfe9f6` | `#365a84` | `#061f44` | `#d5eaff` |

---

## 2. Tipografia e Escalonamento de Fonte

A tipografia prioriza fontes sem serifa padrão do sistema operacional para garantir legibilidade instantânea e desempenho rápido.

- **Família de Fontes:** `Arial, Helvetica, sans-serif`
- **Altura de Linha (Line Height):** `1.55` para otimizar leitura em blocos de texto.

### 2.1 Acessibilidade de Tamanho
O sistema suporta três níveis de escalonamento controlados pelo usuário no cabeçalho. As preferências modificam o tamanho base do HTML e as posições de layout:

1. **Fonte Normal (Padrão):** 
   - Elemento `html` com classe padrão.
   - Base: `100%` (geralmente `16px`).
2. **Fonte Grande:**
   - Adiciona classe `.font-large` no `html`.
   - Base: `112.5%` (geralmente `18px`).
   - Ajusta a variável `--nav-offset` para `88px`.
3. **Fonte Muito Grande:**
   - Adiciona classe `.font-xlarge` no `html`.
   - Base: `125%` (geralmente `20px`).
   - Ajusta a variável `--nav-offset` para `102px`.

---

## 3. Layout e Grids (Grid System)

O SGP utiliza o CSS Grid e Flexbox de forma responsiva para organizar o conteúdo.

- **Largura Máxima do Container:** `1420px` (definido por `--container`).
- **Margem de Segurança Lateral:** Mínimo de `24px` de cada lado (`width: min(var(--container), calc(100% - 48px))`).
- **Sombras:** Efeito tridimensional suave em temas claros (`--shadow: 0 18px 45px rgba(68, 43, 30, 0.11)`). Removido no tema de alto contraste.
- **Arredondamento:** Bordas arredondadas padrão de `8px` (`--radius`) e cantos secundários de `6px` (`--radius-sm`).

### 3.1 Padrões de Grelhas (Grids)

* **Grelha de Funcionalidades (`.feature-grid`):**
  - Layout de 4 colunas em desktops.
  - Usado na tela inicial para exibir categorias ou vantagens.
* **Grelha do Catálogo (`.product-grid`):**
  - Layout de 3 colunas em telas de desktop.
  - Utilizado para expor os cards de produtos.
* **Grelha Administrativa / Carrinho (`.admin-grid` / `.cart-layout`):**
  - Layout assimétrico de 2 colunas.
  - Coluna principal (esquerda): `1.5fr` (tabelas, fluxo principal).
  - Coluna lateral (direita): Mínimo `300px` ou `0.75fr` (resumos, filtros rápidos).

---

## 4. Componentes de Interface (UI Components)

### 4.1 Botões

Os botões possuem altura mínima ergonômica de `42px` para facilitar o toque em dispositivos móveis.

* **Botão Primário (`.btn-primary`):** 
  - Fundo: `var(--primary)`
  - Texto: `var(--surface)`
  - Usado para ações principais (ex: "Finalizar Pedido", "Salvar").
* **Botão Secundário (`.btn-secondary`):**
  - Fundo: `var(--wheat)`
  - Texto: `var(--primary-dark)`
  - Usado para ações secundárias ou de fluxo paralelo.
* **Botão Fantasma (`.btn-ghost`):**
  - Borda: `var(--line)`
  - Fundo: Transparente ou `var(--surface)`
  - Usado para ações alternativas ou reversões de estado (ex: "Voltar", "Desfazer").
* **Botão de Ícone (`.icon-button`):**
  - Dimensões fixas: `42px x 42px`.
  - Usado para ações compactas (ex: lixeira para deletar item).

### 4.2 Formulários e Elementos de Entrada

* **Campos Padrão (`input`, `select`, `textarea`):**
  - Altura mínima: `44px`.
  - Borda padrão: `1px solid var(--line)`.
  - Foco: Muda a borda para `var(--accent)` e remove a linha padrão (`outline: none`).
* **Estado de Validação Inválida (`[aria-invalid="true"]`):**
  - Borda: Muda para `var(--danger)` (vermelho).
  - Acompanhado de mensagem auxiliar curta logo abaixo com a cor de texto `var(--danger)`.
* **Controle Segmentado (`.segmented-control` / `.payment-options`):**
  - Agrupamento em colunas flexíveis de opções onde o usuário seleciona uma opção simulando botões grandes (ex: escolher Pix, Cartão de Crédito ou Dinheiro).

### 4.3 Elementos de Navegação

* **Cabeçalho Fixo (`.app-header`):**
  - Com comportamento fixo (`position: sticky; top: 0;`).
  - Fundo com transparência e desfoque inteligente (`backdrop-filter: blur(14px)`).
* **Menu de Navegação Principal (`.app-nav`):**
  - Com rolagem horizontal automática em telas estreitas (`.nav-scroll`).
  - Badges de itens ativos com fundo `var(--accent-soft)` e texto `var(--primary-dark)`.
  - Links administrativos ocultados de acordo com o perfil de login de forma automática.

---

## 5. Princípios de Transição e Gestalt

- **Micro-animações de Transição:**
  - O conteúdo principal (`.main-content`) possui transição suave de opacidade e posicionamento durante a mudança de rotas (`transition: opacity 160ms ease, transform 160ms ease`).
  - Cards de produto contam com aumento de escala de imagem suave de `1.04` ao sofrer hover (`.product-card:hover .product-image img`).
- **Princípio de Proximidade:**
  - Agrupamento de informações relacionadas (ex: preço e botão de adicionar estão dentro da mesma caixa semântica no card de produto).
- **Princípio de Similaridade:**
  - Todos os alertas rápidos de toast e modais compartilham o mesmo contorno, posicionamento e cantos arredondados para identificação de feedback.
