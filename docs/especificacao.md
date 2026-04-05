# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

Nesta parte do trabalho você deve detalhar a documentação dos requisitos do sistema proposto de acordo com as seções a seguir. Ressalta-se que aqui é utilizado como exemplo um sistema de gestão de cursos de aperfeiçoamento.

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades da Coordenação do Curso de Sistemas de Informação da PUC Minas que devem ser atendidas pelo projeto SCCA – Sistema de Cadastro de Cursos de Aperfeiçoamento.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado SCCA – Sistema de Cadastro de Cursos de Aperfeiçoamento. Ele terá somente um componente (módulo) com os devidos elementos necessários à gestão de cursos.

### 3.2.2 Missão do produto
Gerenciar informações sobre a oferta de cursos de aperfeiçoamento, gerenciar a composição das turmas, alunos, professores e matrículas. 

### 3.2.3 Limites do produto
O SCCA não fornece nenhuma forma de avaliação de alunos, pagamento de parcelas do curso, pagamento a professore e agendamentos. O SCCA não contempla o atendimento a vários cursos de Sistemas de Informação de outras unidades da PUC Minas.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Facilidade no cadastro de dados |	Essencial |
|2 | Facilidade na recuperação de informações | Essencial | 
|3 | Segurança no cadastro de matrículas | Essencial | 
|4	| Melhoria na comunicação com os alunos	| Recomendável | 

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
| Coordenador |	Usuário gerente do sistema responsável pelo cadastro e manutenção de cursos de aperfeiçoamento. Possui acesso geral ao sistema. |
| Secretaria |	Usuário responsável por registros de alunos, professores, turmas e gerência de matrículas. |
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

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Aluno |	Cadastro de informações relativas aos alunos. |
| 2	| Curso |	Cadastro geral de cursos de aperfeiçoamento. |
| 3 |	Matrícula |	Cadastro de Matrículas de alunos nos cursos. |
| 4 |	Turma |	Cadastro de turmas.
| 5	|	Professor |	Cadastro geral de professores que ministram as disciplinas. |
| ... |	... |	... |
