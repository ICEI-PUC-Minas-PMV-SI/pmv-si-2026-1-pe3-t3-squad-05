# 4. PROJETO DO DESIGN DE INTERAÇÃO

## 4.1 Personas

1. Persona: Matheus, o "Correr é Dinheiro"

Matheus Rodrigues, 29 anos, atua como motoboy. Ele busca otimizar sua rotina matinal para poupar tempo e maximizar seus ganhos ao longo do dia. Matheus procura um estabelecimento prático onde possa tomar um café da manhã rápido e nutritivo, garantindo um bom começo para sua jornada de trabalho. 

2. Persona: Carla Perez, "trem bão demais"

Carla Perez, 65 anos, é proprietária de uma confeitaria em Patos de Minas – MG. Com mais de 20 anos de experiência, construiu uma clientela fiel baseada na qualidade dos seus produtos. Hoje, seu principal desafio é organizar e acompanhar tudo sem perder vendas ou cometer erros.

3. Persona: Lúcio Costa, o Detalhista

Lúcio, 34 anos, é arquiteto autônomo e trabalha em sistema de home office. Morador de um bairro central, ele é o "organizador oficial" dos aniversários da família e dos happy hours entre amigos. Praticante de ciclismo urbano, ele preza pela estética e tem pavor de processos burocráticos ou analógicos.

4. Persona: Eusébio Oliveira, o Chato.

Eusébio, 82 anos, é aposentado. Mora com sua esposa e tem problemas no joelho. Mora nos arredores de Contagem, numa área mais distante de grandes centros comerciais. Não tem muita paciência para tecnologia atual. Devido a seu impedimento de mobilidade, distância e avançada idade, precisa de algo intuitivo e simples.

5. Ricardo Silva
   
Ricardo, 42 anos, proprietário e gerente geral, abriu sua confeitaria há 8 anos. Ele entende muito de panificação, mas hoje seu foco é manter o negócio lucrativo. Ele usa o celular para quase tudo, mas não tem paciência para relatórios extensos.

## 4.2 Mapa de Empatia

Mapa de Empatia: Matheus Rodrigues

<img width="1600" height="900" alt="WhatsApp Image 2026-05-10 at 22 22 33 (1)" src="https://github.com/user-attachments/assets/4f79c8c1-cb59-41ab-834d-44e898378167" />

Mapa de Empatia: Carla Perez

<img width="1600" height="900" alt="WhatsApp Image 2026-05-10 at 22 22 33" src="https://github.com/user-attachments/assets/a7601466-5fbc-4dd9-8d54-bb130b54e1be" />

Mapa de Empatia: Lúcio Costa

<img width="3780" height="1890" alt="1" src="https://github.com/user-attachments/assets/514d41c2-4067-4344-9482-8aa793dac6da" />

Mapa de Empatia: Eusébio Oliveira

<img width="3780" height="1890" alt="2" src="https://github.com/user-attachments/assets/db3055ad-455f-43c4-8e0f-7b37abc88432" />

Mapa de Empatia: Ricardo Silva

<img width="3780" height="1890" alt="Lúcio Costa" src="https://github.com/user-attachments/assets/ad4d031a-9247-47bd-afbc-41941b4d318e" />

## 4.3 Protótipos das Interfaces

O protótipo de alta fidelidade do SGP - Sistema Gerenciador de Produtos foi desenvolvido com a proposta de permitir a avaliação dos principais fluxos previstos na especificação: consulta ao catálogo, cadastro e autenticação, montagem de carrinho, encomenda personalizada, agendamento de entrega ou retirada, pagamento simulado, acompanhamento de status e uso de um painel gerencial para pedidos, produtos, estoque e relatórios.

Por se tratar de protótipo de alta fidelidade, as telas foram implementadas com identidade visual próxima à versão final esperada, incluindo navegação superior, cards de produtos, formulários, botões de ação, indicadores de status, mensagens de retorno, tabelas administrativas e estados vazios. O protótipo não se limita a imagens estáticas: ele permite interação real com filtros, busca, carrinho, alteração de quantidade, inclusão de encomenda personalizada, atualização visual de estoque, alteração de preço, mudança de disponibilidade e mudança de status de pedidos.

### 4.3.1 Telas e fluxos representados

As principais interfaces implementadas são:

| Tela/fluxo | Descrição no protótipo | Requisitos relacionados |
|---|---|---|
| Início | Apresenta o objetivo do sistema, atalhos para catálogo e área gerencial, além de indicadores de produtos disponíveis, pedidos simulados e alertas de estoque. | RNF1, RNF2 |
| Login | Permite acesso por e-mail e senha, consumindo a rota `/login` do servidor local. | RF1, RNF6 |
| Cadastro de usuário | Permite cadastrar nome completo, CPF, e-mail, telefone e senha, com validações visuais antes do envio. | RF1, RNF7 |
| Catálogo de produtos | Exibe produtos com imagem, descrição, preço, categoria, disponibilidade, busca textual e filtro por categoria. | RF2, RNF1 |
| Detalhe do produto | Mostra informações complementares do produto e permite adicioná-lo ao carrinho quando disponível. | RF2, RF3 |
| Carrinho | Permite revisar produtos, alterar quantidades, remover itens e visualizar subtotal/total antes de avançar. | RF3 |
| Encomenda personalizada | Permite configurar bolo com formato, tamanho, recheio, cobertura, mensagem, observações e imagem de referência simulada. | RF4, RF5 |
| Entrega ou retirada | Permite selecionar retirada na loja ou entrega, além de informar data, horário e endereço quando necessário. | RF5, RF6 |
| Pagamento simulado | Apresenta Pix, cartão de crédito e dinheiro na retirada como opções de pagamento. | RF8 |
| Confirmação e status | Registra o pedido no estado do protótipo e permite acompanhar etapas como recebido, em preparo, pronto para retirada/saiu para entrega e finalizado. | RF9 |
| Painel do gerente | Mostra métricas de pedidos ativos, produtos disponíveis, alertas de estoque e receita simulada. | RF7, RNF3 |
| Gestão de pedidos | Lista pedidos e permite alterar seu status, demonstrando o fluxo administrativo. | RF9 |
| Gestão de produtos | Permite ajustar preço, estoque e disponibilidade dos produtos cadastrados. | RF2, RF7, RNF3 |
| Estoque de insumos | Exibe insumos, fornecedores, quantidade atual e indicação de nível crítico. | RF7, RNF3 |
| Relatórios simulados | Representa relatórios semanais de estoque e encomendas, com pré-visualização simulada de Excel e PDF. | RNF4, RNF5 |

### 4.3.2 Demonstração dos Requisitos Funcionais

O protótipo demonstra os requisitos funcionais da seguinte forma:

| Requisito | Como aparece no protótipo |
|---|---|
| RF1 - Cadastro de usuário | Tela de cadastro com nome, CPF, e-mail, telefone e senha; login com e-mail e senha. |
| RF2 - Catálogo de produtos | Catálogo com fotos, descrição, preço, categoria, disponibilidade, busca e filtros. |
| RF3 - Carrinho de compra | Inclusão, remoção e alteração de quantidade de produtos antes da finalização. |
| RF4 - Customização de produtos | Formulário de encomenda com formato, tamanho, recheio, cobertura, mensagem, imagem de referência e observações. |
| RF5 - Cadastro de encomendas personalizadas | Encomenda personalizada é adicionada ao carrinho e, após confirmação, vira pedido no protótipo. |
| RF6 - Agendamento de entrega ou retirada | Tela de entrega/retirada com data e horário. |
| RF7 - Gestão de estoque híbrido | Painel e tela de estoque permitem consultar e alterar quantidades de produtos e insumos. |
| RF8 - Integração de pagamento | Tela de pagamento apresenta Pix, cartão de crédito e dinheiro na retirada. |
| RF9 - Notificação em tempo real | Acompanhamento de status por linha do tempo e alteração de status no painel do gerente. |

### 4.3.3 Demonstração dos Requisitos Não Funcionais

Os requisitos não funcionais também foram considerados no protótipo, principalmente como demonstrações de interface e comportamento esperado:

| Requisito | Como aparece no protótipo |
|---|---|
| RNF1 - Multiplataforma e interface intuitiva | Aplicação web responsiva, com navegação por menus, botões claros, filtros, cards e formulários organizados. |
| RNF2 - Bom desempenho | O protótipo usa páginas renderizadas em JavaScript, dados locais e navegação por hash, o que reduz atrasos percebidos durante os testes. |
| RNF3 - Consulta de estoque em tempo real | Estoque de produtos e insumos é exibido e atualizado imediatamente na interface. |
| RNF4 - Relatório semanal em Excel | Tela de relatórios contém a opção de pré-visualização de Excel para estoque e consumo. |
| RNF5 - Relatório semanal em PDF | Tela de relatórios contém a opção de pré-visualização de PDF para encomendas personalizadas. |
| RNF6 - LGPD e transações criptografadas | A tela de pagamento informa que segurança e criptografia são requisitos previstos. |
| RNF7 - Validação de e-mail e CPF | O cadastro bloqueia envio com e-mail ou CPF inválido e exibe mensagens de erro. |
| RNF8 - Manutenção temporária de dados em perda de conexão |  A arquitetura final contará com armazenamento temporário em `localStorage` ou mecanismo equivalente. |
| RNF9 - Suporte a aumento repentino de acessos | A arquitetura final deve prever escalabilidade; o protótipo local não testa carga. |

### 4.3.4 Princípios de design incorporados

O protótipo incorpora princípios gestálticos para facilitar a compreensão das telas e reduzir esforço cognitivo:

- Proximidade: informações relacionadas ficam agrupadas, como preço, status e ação dentro de cada card de produto; no carrinho, nome, descrição, quantidade e subtotal aparecem no mesmo bloco.
- Similaridade: botões, badges, cards, tabelas e campos de formulário seguem estilos consistentes, permitindo que o usuário reconheça rapidamente elementos com a mesma função.
- Continuidade: a navegação superior mantém os fluxos em ordem previsível, conduzindo o cliente de catálogo para carrinho, entrega, pagamento, confirmação e status.
- Figura-fundo: cards, painéis e áreas administrativas usam contraste, espaçamento e hierarquia visual para destacar conteúdo principal em relação ao fundo.
- Fechamento: cada tela organiza uma tarefa completa, como cadastrar, montar carrinho ou alterar estoque, evitando que o usuário precise procurar partes dispersas da ação.
- Pregnância: a interface privilegia formas simples, textos diretos, ícones conhecidos e organização em grades, facilitando reconhecimento rápido mesmo por usuários com menor familiaridade tecnológica.

Além dos princípios gestálticos, o protótipo considera as necessidades das personas. Para Matheus, prioriza rapidez no catálogo, busca e compra. Para Carla, oferece visão gerencial de pedidos e estoque. Para Lúcio, apresenta customização detalhada, imagem de referência, preço estimado e acompanhamento de status. Para Eusébio, mantém navegação simples, botões visíveis, textos objetivos e feedback imediato.

### 4.3.5 Recomendações ergonômicas e regras de design

As recomendações ergonômicas foram incorporadas por meio de uma interface orientada a tarefas, com linguagem simples, agrupamento visual, feedback imediato e redução de passos desnecessários. Os formulários usam campos específicos para data, horário, e-mail, telefone, arquivo e senha, o que ajuda o navegador a oferecer controles adequados em computadores e celulares. A navegação principal permanece disponível durante todo o uso, permitindo que o usuário retorne rapidamente a qualquer área do sistema.

As 8 regras de ouro de Shneiderman foram consideradas da seguinte forma:

1. Buscar consistência: o protótipo usa o mesmo padrão visual para botões, cards, tabelas, formulários, badges de status e mensagens em todas as telas.
2. Permitir atalhos para usuários frequentes: a navegação fixa oferece acesso direto a catálogo, encomenda, status, gerente, pedidos, produtos, estoque e relatórios; o catálogo também possui busca e filtros por categoria.
3. Oferecer feedback informativo: ações como adicionar item ao carrinho, remover produto, alterar status, atualizar estoque, criar cadastro e confirmar pedido exibem mensagens de retorno por toast.
4. Projetar diálogos com início, meio e fim: os fluxos de compra e encomenda seguem etapas claras: escolha do produto, carrinho, entrega/retirada, pagamento e confirmação.
5. Prevenir erros: produtos indisponíveis têm botão desabilitado; campos obrigatórios são validados; CPF e e-mail inválidos bloqueiam o cadastro; quantidades de estoque são ajustadas para não ficarem negativas.
6. Permitir reversão de ações: o usuário pode remover itens do carrinho, diminuir quantidades, voltar ao catálogo, alterar opções antes da confirmação e trocar o status de pedidos no painel gerencial.
7. Manter o usuário no controle: a interface evita passos automáticos irreversíveis; o usuário escolhe filtros, forma de recebimento, forma de pagamento, itens do carrinho e momento de confirmar o pedido.
8. Reduzir carga de memória: informações importantes ficam visíveis durante a tarefa, como resumo do carrinho, total do pedido, status de disponibilidade, preço estimado da encomenda e etapas do acompanhamento.

Também foram aplicadas recomendações ergonômicas de legibilidade, reconhecimento e prevenção de sobrecarga: os textos são curtos, os ícones reforçam ações principais, os estados vazios explicam o que aconteceu, as tabelas organizam dados administrativos e os indicadores coloridos ajudam a diferenciar itens disponíveis, esgotados, críticos ou adequados.

Assim, o protótipo de alta fidelidade está adequado para a etapa seguinte de testes com usuários. Ele permite observar se clientes conseguem encontrar produtos, montar pedidos, personalizar encomendas e acompanhar status, além de permitir avaliar se o gerente compreende a gestão de pedidos, produtos e estoque. As limitações identificadas, como persistência real, relatórios efetivos, segurança/LGPD e controle transacional de estoque, devem ser tratadas em versões posteriores do sistema.

## 4.4 Testes com Protótipos

Os testes com o protótipo de alta fidelidade foram planejados para verificar se os usuários conseguem compreender a proposta do SGP, navegar pelas principais áreas e concluir tarefas relacionadas aos requisitos definidos na especificação. A avaliação combina dois métodos: teste com usuário, por observação de sessão de uso, e avaliação heurística, por inspeção das interfaces com base nas heurísticas de Nielsen.

O [teste com usuário](./testes/Relatorio_de_Testes_com_Usuario.docx) foi preenchido com o cenário de uso, tarefas, caminhos esperados, critérios de sucesso e questões finais. O objetivo é observar o [fluxo das tarefas](./testes/Fluxo.pptx) sendo seguido pelos usuários representativos das personas do projeto, incluindo clientes com pressa, clientes que desejam personalizar encomendas, usuários com menor familiaridade tecnológica e gerentes responsáveis por pedidos e estoque.

### 4.4.1 Objetivos da avaliação

| Objetivo | Relação com o protótipo |
|---|---|
| Verificar se o usuário entende a finalidade do SGP ao acessar a tela inicial. | Tela Início, navegação principal e resumo do sistema. |
| Avaliar se o cliente consegue localizar produtos e montar um pedido. | Catálogo, busca, filtros, detalhe do produto e carrinho. |
| Avaliar se o cliente consegue criar uma encomenda personalizada. | Tela Encomenda, preço estimado, imagem de referência e carrinho. |
| Avaliar se o cliente entende o fluxo de entrega, pagamento e acompanhamento. | Entrega/retirada, pagamento simulado, confirmação e status. |
| Avaliar se o gerente compreende as funções administrativas. | Painel do gerente, gestão de pedidos, produtos, estoque e relatórios. |
| Identificar problemas de usabilidade antes da evolução para uma versão funcional completa. | Mensagens de erro, feedbacks, organização visual, prevenção de erros e clareza dos fluxos. |

### 4.4.2 Perfil dos participantes

Os participantes indicados para a aplicação dos testes devem representar as personas já descritas neste documento:

| Perfil | Persona associada | Foco da observação |
|---|---|---|
| Cliente com pouco tempo disponível | Matheus Rodrigues | Rapidez para encontrar produto, adicionar ao carrinho e finalizar pedido. |
| Gerente/proprietária da confeitaria | Carla Perez | Clareza do painel gerencial, pedidos, produtos e estoque. |
| Cliente detalhista que organiza eventos | Lúcio Costa | Facilidade para personalizar encomenda, conferir preço e acompanhar status. |
| Cliente com baixa familiaridade digital | Eusébio Oliveira | Simplicidade da navegação, compreensão dos botões e segurança percebida. |

### 4.4.3 Tarefas propostas

As tarefas foram definidas para cobrir os principais RF e RNF demonstrados pelo protótipo:

| Tarefa | Descrição para o participante | Fluxo esperado | Requisitos avaliados |
|---|---|---|---|
| Tarefa 1 - Cadastro e entrada no sistema | Criar um cadastro de cliente e acessar o sistema. | Início > Entre > Criar novo cadastro > Preencher dados válidos > Criar cadastro. | RF1, RNF1, RNF7 |
| Tarefa 2 - Compra de produto do catálogo | Encontrar um produto disponível, adicioná-lo ao carrinho e revisar o pedido. | Catálogo > Buscar/filtrar produto > Adicionar > Carrinho > Ajustar quantidade/remover se necessário. | RF2, RF3, RNF1, RNF2 |
| Tarefa 3 - Encomenda personalizada | Montar uma encomenda de bolo personalizada com data e horário de retirada ou entrega. | Encomenda > Selecionar opções > Adicionar ao carrinho > Entrega/retirada > Pagamento simulado > Confirmação. | RF4, RF5, RF6, RF8 |
| Tarefa 4 - Pagamento e confirmação | Selecionar uma forma de pagamento e confirmar o pedido. | Pagamento > Escolher Pix, cartão de crédito ou dinheiro na retirada > Confirmar. | RF8 |
| Tarefa 5 - Acompanhamento de status | Consultar o status de um pedido confirmado. | Status > localizar pedido > Interpretar etapas da linha do tempo. | RF9 |
| Tarefa 6 - Gestão administrativa | Acessar a área gerencial, verificar estoque crítico e alterar o status de um pedido. | Gerente > Consultar métricas > Estoque > Verificar/alterar insumos críticos > Pedidos > Verificar/alterar status. | RF7, RF9, RNF3 |

### 4.4.4 Critérios de registro

Durante cada sessão, o avaliador deve registrar o caminho utilizado pelo participante, o grau de sucesso da tarefa, dúvidas, comentários, erros de navegação, tempo aproximado e sugestões espontâneas. O relatório usa a seguinte escala:

| Nota | Critério |
|---|---|
| 0 | O participante não completou a tarefa. |
| 1 | O participante completou com dificuldade, demora excessiva ou ajuda do avaliador. |
| 2 | O participante completou facilmente, sem ajuda relevante. |

Também devem ser registradas as respostas às questões introdutórias e finais, principalmente a impressão geral do sistema, o que o participante mais gostou, o que menos gostou e quais funções sentiu falta.

### 4.4.5 Avaliação heurística

A [avaliação heurística](./testes/Avaliacao_Heuristica.xlsx) foi preenchida considerando as dez heurísticas de Nielsen: visibilidade do status, correspondência com o mundo real, controle e liberdade, consistência, prevenção de erros, reconhecimento em vez de memorização, flexibilidade, design minimalista, recuperação de erros e ajuda/documentação.

Os principais pontos positivos identificados foram a navegação direta, a consistência visual entre telas, o uso de feedback por mensagens, a organização por cards e tabelas e a presença de estados de disponibilidade e status. Os principais pontos de melhoria foram a ausência de ajuda contextual, a simulação de relatórios sem explicar o limite da funcionalidade em todas as telas, a falta de persistência temporária dos formulários em caso de perda de conexão e a necessidade de reforçar o controle de acesso entre cliente e gerente.

### 4.4.6 Síntese dos resultados esperados

Com base na inspeção do protótipo e nos fluxos previstos, espera-se que os usuários consigam concluir com facilidade as tarefas de catálogo, carrinho e encomenda personalizada, pois essas telas apresentam botões claros, informações agrupadas e feedback imediato. As tarefas administrativas podem exigir mais atenção, principalmente para usuários que não tenham familiaridade com estoque, pedidos e relatórios.

As melhorias recomendadas para a próxima versão são:

- incluir data de nascimento e perfil no cadastro, conforme RF1;
- diferenciar permissões de cliente e gerente;
- implementar persistência temporária para dados digitados, conforme RNF8;
- transformar relatórios simulados em geração real de Excel e PDF;
- reforçar mensagens de ajuda nas telas de pagamento, relatórios e área gerencial;
- implementar persistência real de pedidos, produtos, estoque e encomendas;
- melhorar segurança técnica com HTTPS, criptografia adequada e proteção de dados pessoais, conforme RNF6.

Com esses registros, o protótipo fica preparado para aplicação com participantes reais e para consolidação dos resultados observados na etapa de testes.
