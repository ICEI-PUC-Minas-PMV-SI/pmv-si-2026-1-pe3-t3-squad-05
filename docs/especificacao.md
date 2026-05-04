# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta parte do trabalho você deve detalhar a documentação dos requisitos do sistema proposto de acordo com as seções a seguir. Ressalta-se que aqui é utilizado como exemplo um sistema de gestão de cursos de aperfeiçoamento.

## 3.1 Objetivos deste documento
O objetivo desse sistema é auxiliar no gerenciamento de insumos, produtos, encomendas e vendas de panificadoras e confeitarias.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado SGP - Sistema Gerenciador de Produtos. Ele terá componentes com os devidos elementos necessários à gestão de controle de estoque de produtos e vendas.

### 3.2.2 Missão do produto
Gerenciar informações de vendas, encomendas e estoque de insumos. 

### 3.2.3 Limites do produto
O SGP não contempla a gestão de recursos de outras categorias do ramo alimentício.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no cadastro de dados |	Essencial |
|2 | Facilidade na recuperação de informações | Essencial | 
|3 | Melhoria na gestão dos insumos. | Essencial | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF1 | Cadastro de Usuário | Coletar Nome completo, Documentos(CPF), Data de nascimento, E-mail e Número de telefone |
| RF2 | Cadastro de Encomendas Personalizadas | Permitir que o cliente faça encomendas personalizadas, Foto, descrição(Ex:Nome, Ano, Mensagem...) |
| RF3 |	Catálogo de Produtos | Visualização de produtos com fotos, descrição, preço e disponibilidade em tempo real |
| RF4 |	Gestão de Pedidos Perosonalizados | Opção de alteração no pedido, ponto do pedido(Bem Passado,Mal Passado...), retirar ingredientes ou adicionar ingredientes |
| RF5 |	Carrinho de Compra | Opção de adicionar, remover e alterar quantidade de produtos no carrinho |
| RF6 |	Agendamento de Entrega/Retirada	| Opção de entrega e retirada do pedido na loja |
| RF7 |	Gestão de Estoque | O Sistema deve dar baixa automática no estoque de insumos ou produtos finalizados pós venda |
| RF8 |	Integração de Pagamento | Opção de pagamento do pedido, Cartão de crédito, Pix e Dinheiro(Pagamento em dinheiro somente em caso de retirada na loja) |
| RF9 |	Notificação em Tempo Real | O sistema deve enviar atualizações sobre o status do pedido(Ex:"Seu pedido está em preparo","O entregador está a caminho") |
| ... |	... |	... |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | O Sistema deve ter suporte a multiplataformas, com a interface intuitiva para facilitar a navegação e escolhas do pedido feito pelo cliente. |
| RNF2 | O Sistema deve ser leve, para evitar atraso dos pedidos e atraso na troca de página. |
| RNF3 | O Sistema deve ter um relatorio de estoque em tempo real. |
| RNF4 | O Sistema deve gerar um relatório semanal de estoque de produtos e média de vendas em uma planilha Excel. |
| RNF5 | O Sistema deve disponibilizar um relatório semanal em formato PDF com encomendas personalizadas. |
| RNF6 | O Sistema deve estar em conformidade com a LGPD e garantir transações criptografadas. |
| RNF7 | O Sistema deve impedir cadastros com e-mails inválidos ou CPFs incorretos em tempo real.|
| RNF8 | Caso o usuário perca a conexão no preenchimento, os dados já digitados devem ser mantidos temporariamente no navegador(Cache). |
| RNF9 | O Site deve suportar um aumento repentino de acessos. |
| ... |	... |	... |

### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Cliente |	Usuário por realizar solicitações de encomendas. |
| Gerente |	Usuário responsável por cadastro gerência de insumos e produtos. |
| ... |	... |	... |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe3-t3-squad-05/blob/main/src/DiagCasosDeUso.png)
 
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

1) 	O cliente define o conteúdo da encomenda e o horário a ser entregue.
2) 	Se o cliente desejar, ele pode definir que a recomenda seja recorrente neste mesmo horário.

   
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

1) 	O cliente define o conteúdo dos kits pré-prontos.

#### Definir opções para bolos customizados (CSU05)

Sumário: O gerente define as opções para as customizações de bolos.

Ator Primário: Gerente.

Pré-condições: O gerente deve ser validado pelo Sistema.

Fluxo Principal:

1) 	O cliente define as possibilidades para customizações dos bolos.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. O Pedido deve conter a identificação do Cliente responsável pela solicitação e do Funcionário que o gerencia. Utilizamos a classe ItemPedido para criar uma distinção no fluxo do sistema: se o produto for padrão, ele deverá constar no estoque geral e será referenciado diretamente na compra; se for uma Encomenda Personalizada, ela utilizará uma Receita específica que consome Insumos, e estes insumos devem constar no estoque. Se houver falta no estoque de qualquer um dos lados (produtos ou insumos), acionamos o fornecedor correspondente através das entidades de fornecimento.

#### Figura 2: Diagrama de Classes do Sistema.
 
![dcu](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe3-t3-squad-05/blob/main/src/DiagramaDeClasses.png)

### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Usuario |	Classe base que centraliza os dados de identificação e contato (Nome, CPF, E-mail) de quem acessa o sistema. |
| 2	| Funcionario |	Especialização de Usuário para a equipe da loja, registrando cargo e turno de trabalho. |
| 3 |	Cliente |	Especialização de Usuário para os consumidores, com registros de endereço e histórico de pedidos. |
| 4 |	Pedido |	Registro central das transações de venda, vinculado a um Cliente (que compra) e a um Funcionário (que atende). |
| 5	|	ItemPedido |	Relaciona os pedidos normais aos produtos de catálogo, definindo as quantidades e os preços unitários da venda. |
| 6 |	EncomendaPersonalizada |	Especialização de Pedido voltada a itens customizados, exigindo foto de referência e detalhes descritivos. |
| 7 |	Receita |	Estrutura vinculada a uma encomenda personalizada que dita o tempo de preparo e as instruções necessárias. |
| 8 |	InsumoUsado |	Tabela associativa que conecta a Receita aos Insumos do estoque, definindo a quantidade exata de matéria-prima. |
| 9 |	Produto |	Cadastro de produtos padronizados (prontos) do catálogo, incluindo controle de estoque, preço e categoria. |
| 10 |	FornecimentoProduto |	Registra as transações de entrada e reabastecimento de produtos prontos oriundos dos fornecedores. |
| 11 |	FornecedorProduto |	Cadastro dos dados empresariais (CNPJ, Nome Fantasia) dos fornecedores de produtos padronizados. |
| 12 |	Insumo |	Cadastro das matérias-primas e ingredientes, gerenciando a quantidade disponível e a unidade de medida. |
| 13 |	FornecimentoInsumo |	Registra as transações de entrada e reabastecimento de matérias-primas oriundas dos fornecedores. |
| 14 |	FornecedorInsumo |	Cadastro dos dados empresariais dos fornecedores especializados na entrega de insumos/ingredientes. |
