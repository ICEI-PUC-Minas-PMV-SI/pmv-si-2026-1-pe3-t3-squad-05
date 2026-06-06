# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.1 Objetivos deste documento

Este documento descreve os requisitos do Sistema Gerenciador de Produtos, uma solução voltada para auxiliar no gerenciamento de insumos, produtos, encomendas e vendas de panificadoras e confeitarias.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais

O produto será denominado SGP - Sistema Gerenciador de Produtos. Ele terá componentes com os devidos elementos necessários à gestão de controle de estoque de produtos e vendas.

### 3.2.2 Missão do produto

Auxiliar panificadoras e confeitarias no controle integrado de produtos, insumos, encomendas e vendas, reduzindo falhas operacionais e mantendo a disponibilidade atualizada para clientes presenciais e online.

### 3.2.3 Limites do produto

O sistema não contempla gestão financeira completa, folha de pagamento, contabilidade, delivery terceirizado próprio ou gestão de recursos de outros segmentos alimentícios.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1 | Facilidade no cadastro de dados |	Essencial |
|2 | Facilidade na recuperação de informações | Essencial | 
|3 | Melhoria na gestão dos insumos. | Essencial | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional | Descrição |
|---|---|---|
| RF1 | Cadastro de usuário | Permitir o cadastro de clientes e funcionários com nome completo, CPF, data de nascimento, e-mail, telefone, senha e perfil. |
| RF2 | Catálogo de produtos | Exibir produtos da panificadora com foto, descrição, preço, categoria e disponibilidade atualizada. |
| RF3 | Carrinho de compra | Permitir adicionar, remover e alterar a quantidade de produtos antes da finalização do pedido. |
| RF4 | Customização de produtos | Permitir que o cliente personalize produtos, informando formato, tamanho, recheio, cobertura, ingredientes, mensagem, imagem de referência e observações. |
| RF5 | Cadastro de encomendas personalizadas | Registrar pedidos sob encomenda com data, horário, forma de retirada ou entrega, recorrência opcional e detalhes de produção. |
| RF6 | Agendamento de entrega ou retirada | Permitir que o cliente selecione data, horário, recorrência opcional e forma de recebimento por entrega ou retirada no estabelecimento. |
| RF7 | Gestão de estoque híbrido | Controlar o mesmo estoque para vendas físicas e encomendas online, atualizando reservas, baixas e reposições em tempo real. |
| RF8 | Integração de pagamento | Permitir pagamento por cartão de crédito, Pix e dinheiro, sendo dinheiro permitido apenas para retirada na loja. |
| RF9 | Notificação em tempo real | Enviar atualizações de status do pedido, como confirmado, em preparo, pronto para retirada, saiu para entrega ou cancelado. |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional |
|---|---|
| RNF1 | O sistema deve ser multiplataforma e possuir interface intuitiva para facilitar a navegação e a escolha dos produtos pelo cliente. |
| RNF2 | O sistema deve ter bom desempenho, evitando atrasos no carregamento das páginas e na atualização de pedidos. |
| RNF3 | O sistema deve disponibilizar consulta de estoque em tempo real para produtos prontos e insumos. |
| RNF4 | O sistema deve gerar relatório semanal de estoque de produtos, consumo de insumos e média de vendas em planilha Excel. |
| RNF5 | O sistema deve disponibilizar relatório semanal em PDF com encomendas personalizadas e respectivos status. |
| RNF6 | O sistema deve estar em conformidade com a LGPD e garantir transações criptografadas. |
| RNF7 | O sistema deve validar e-mail e CPF em tempo real, exibindo uma notificação clara ao usuário. Cadastros com CPF inválido ou e-mail inválido devem ser impedidos até a correção dos dados. |
| RNF8 | Caso o usuário perca a conexão durante o preenchimento, os dados já digitados devem ser mantidos temporariamente no navegador. |
| RNF9 | O sistema deve suportar aumento repentino de acessos em horários de maior demanda, como manhãs, finais de semana e datas comemorativas. |

### 3.3.3 Usuários 

| Ator | Descrição |
|---|---|
| Cliente | Usuário que consulta produtos, realiza pedidos, personaliza encomendas, agenda retirada ou entrega e acompanha o status. |
| Gerente | Usuário responsável por cadastrar produtos, opções de customização, insumos, fornecedores e regras de estoque. |
| Atendente | Funcionário que apoia o atendimento, registra pedidos, consulta produtos e atualiza status conforme o fluxo operacional. |
| Confeiteiro/Padeiro | Funcionário responsável pela produção dos pedidos, acompanhando encomendas personalizadas e atualizando etapas de preparo. |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso

O diagrama de casos de uso representa as interações entre Cliente, Gerente, Atendente e Confeiteiro/Padeiro. O Cliente consulta o catálogo de produtos, visualiza detalhes, monta o carrinho, registra encomendas personalizadas, agenda entrega ou retirada, realiza pagamento e acompanha o status do pedido. O Gerente gera relatórios, gere estoque e atualiza status administrativos. O Atendente apoia a montagem/registro de pedidos e também atualiza status. O Confeiteiro/Padeiro acompanha a produção e atualiza o status do pedido conforme o preparo.

As relações `include` e `extend` refletem os requisitos RF2, RF3, RF6, RF7, RF8 e RF9. A montagem do carrinho inclui o pagamento no fluxo de finalização, a encomenda personalizada inclui a customização do produto e o agendamento de entrega ou retirada, e a recorrência aparece como extensão opcional do agendamento. A visualização de detalhes do produto é tratada como extensão da consulta ao catálogo.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](../src/DiagCasosDeUso.png)
 
### 3.4.2 Descrições de Casos de Uso

#### Pedir bolo customizado (CSU01)

Sumário: O cliente faz o pedido de um bolo, podendo alterar suas propriedades.

Ator Primário: Cliente.

Pré-condições: O cliente deve ser validado pelo Sistema.

Fluxo Principal:

1) 	O cliente define o formato do bolo.
2)  O cliente define as dimensões do bolo.
3)  O cliente define o recheio do bolo.
4) 	O cliente define a cobertura do bolo.
5)  Se o cliente desejar, ele pode adicionar uma imagem ou desenho no bolo.

#### Programar encomenda (CSU02)

Sumário: O cliente faz o pedido de uma encomenda, marcando o horário para receber.

Ator Primário: Cliente.

Pré-condições: O cliente deve ser validado pelo Sistema.

Fluxo Principal:

1) 	O cliente define o conteúdo da encomenda, a forma de recebimento, a data e o horário.
2) 	Se o cliente desejar, ele marca a encomenda como recorrente e escolhe a periodicidade.
3) 	O sistema registra a recorrência no pedido e exibe essa informação no acompanhamento e na gestão de pedidos.

   
#### Pedir um kit pré-pronto (CSU03)

Sumário: O cliente faz o pedido de um kit pré-pronto definido pelo gerente.

Ator Primário: Cliente.

Pré-condições: O cliente deve ser validado pelo Sistema.

Fluxo Principal:

1) 	O cliente escolhe o kit a ser entregue.

#### Definir um kit pré-pronto (CSU04)

Sumário: O gerente define o conteúdo dos kits pré-prontos.

Ator Primário: Gerente.

Pré-condições: O gerente deve ser validado pelo Sistema.

Fluxo Principal:

1) 	O gerente define o conteúdo dos kits pré-prontos.

#### Definir opções para bolos customizados (CSU05)

Sumário: O gerente define as opções para as customizações de bolos.

Ator Primário: Gerente.

Pré-condições: O gerente deve ser validado pelo Sistema.

Fluxo Principal:

1) 	O gerente define as possibilidades para customizações dos bolos.

#### Customizar produto para encomenda personalizada (CSU06)

Sumário: O cliente personaliza um produto para uma encomenda especial.

Ator Primário: Cliente.

Pré-condições: O cliente deve estar cadastrado e o produto deve permitir customização.

Fluxo Principal:

1) O cliente seleciona um produto com opção de customização.
2) O sistema exibe as opções configuradas pelo gerente para aquele tipo de produto.
3) O cliente escolhe as opções desejadas e informa observações de preparo.
4) O cliente anexa uma imagem de referência, quando necessário.
5) O sistema calcula o valor estimado e o prazo mínimo de produção.
6) O sistema consulta o estoque de produtos e insumos necessários.
7) O cliente confirma a customização e adiciona o item personalizado ao pedido.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. O Pedido deve conter a identificação do Cliente responsável pela solicitação e do Funcionário que o gerencia. Utilizamos a classe ItemPedido para criar uma distinção no fluxo do sistema: se o produto for padrão, ele deverá ser referenciado diretamente no item do pedido; se for uma Encomenda Personalizada, ela utilizará uma Receita específica que consome Insumos. Produtos e insumos são controlados pela classe Estoque, que registra saldo disponível, saldo reservado e estoque mínimo. As classes ReservaEstoque e MovimentoEstoque representam, respectivamente, as quantidades comprometidas por pedidos ou encomendas e o histórico de entradas, saídas, ajustes, reservas e baixas. Se houver falta no estoque de qualquer um dos lados, acionamos o fornecedor correspondente através das entidades de fornecimento.

#### Figura 2: Diagrama de Classes do Sistema.
 
![Diagrama de Classes do Sistema](../src/DiagramaDeClasses.png)

### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|---|---|---|
| 1 | Usuario | Classe base que centraliza os dados de identificação e contato de quem acessa o sistema, como nome, CPF, e-mail e telefone. |
| 2 | Funcionario | Especialização de usuário para a equipe da loja, registrando cargo, turno e permissões. |
| 3 | Cliente | Especialização de usuário para consumidores, com endereço, histórico de pedidos e preferências. |
| 4 | Pedido | Registro central das transações, vinculado ao cliente, aos itens comprados, à origem da venda e ao status de atendimento. |
| 5 | ItemPedido | Representa cada item de um pedido, registrando produto, quantidade, preço unitário, customização associada e subtotal. |
| 6 | Produto | Cadastro de produtos padronizados do catálogo, incluindo preço, categoria, foto, disponibilidade e indicação de customização. |
| 7 | EncomendaPersonalizada | Registro dos detalhes específicos de um item personalizado, como mensagem, formato, imagem de referência, observações e prazo. |
| 8 | Receita | Estrutura vinculada a produtos e encomendas, contendo instruções de preparo, tempo estimado e insumos necessários. |
| 9 | InsumoUsado | Classe associativa que conecta receita e insumo, informando quantidade e unidade de medida utilizada. |
| 10 | Insumo | Cadastro das matérias-primas e ingredientes usados na produção, como farinha, fermento, recheios e embalagens. |
| 11 | Estoque | Controla saldo disponível, saldo reservado, estoque mínimo e operações de reserva, baixa, reposição e sincronização entre canais. |
| 12 | ReservaEstoque | Registra a quantidade reservada para um pedido online ou encomenda, permitindo confirmar consumo ou liberar reserva em cancelamentos. |
| 13 | MovimentoEstoque | Histórico de entradas, saídas, baixas por venda presencial, consumo por encomenda, ajustes e reposições. |
| 14 | Fornecedor | Cadastro de fornecedores de produtos prontos, insumos e embalagens, com dados de contato e identificação fiscal. |
| 15 | Fornecimento | Registro de compras e reposições feitas junto aos fornecedores, atualizando o estoque conforme o recebimento. |
