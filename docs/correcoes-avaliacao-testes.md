# Correções após a avaliação heurística e o relatório de testes

## 1. Objetivo

Este documento registra como os pontos levantados nos documentos da entrega anterior foram tratados na versão atual do protótipo SGP:

- [Avaliação Heurística](./testes/ANTIGO_testes_entrega_3/Avaliacao_Heuristica.xlsx);
- [Relatório de Testes com Usuário](./testes/ANTIGO_testes_entrega_3/Relatorio_de_Testes_com_Usuario.docx).

A avaliação heurística contém problemas e sugestões consolidados para as dez heurísticas de Nielsen. O relatório de testes com usuário contém o roteiro, as tarefas e os riscos que deveriam ser observados, mas não possui resultados preenchidos por participantes. Por isso, os itens desse relatório são tratados aqui como melhorias previstas, e não como falhas comprovadas durante sessões de uso.

## 2. Correções da avaliação heurística

| Heurística | Ponto levantado | Correção na versão atual | Situação |
|---|---|---|---|
| 1. Visibilidade do status | Relatórios, pagamento e upload não deixavam claro quando uma ação era apenas simulada. | Os relatórios passaram a gerar conteúdo real em CSV e HTML imprimível, com filtros, visualização no navegador e download. O pagamento continua identificado como simulado e o campo de imagem informa que o upload não envia o arquivo. Toasts confirmam cadastro, pedido, alterações administrativas e geração de relatório. | Corrigido |
| 2. Correspondência com o mundo real | Estoque crítico, relatórios e a diferença entre produto pronto e encomenda precisavam de maior clareza. | As telas usam termos do domínio, como produto, encomenda personalizada, insumo, estoque crítico, retirada, entrega e pedidos pendentes. Produtos e encomendas possuem fluxos separados, e o painel apresenta indicadores e filtros próprios para pedidos e estoque. | Corrigido |
| 3. Controle e liberdade | Não havia cancelamento ou edição após a confirmação, nem restrição da área gerencial. | Itens removidos do carrinho e alterações de status podem ser desfeitos. Pedidos em estados permitidos podem ser cancelados com confirmação. As rotas administrativas são protegidas por perfil e os links incompatíveis são ocultados. A edição completa de um pedido já confirmado ainda não foi implementada. | Parcialmente corrigido |
| 4. Consistência e padrões | Ações simuladas e efetivas usavam controles semelhantes sem distinção suficiente. | Relatórios deixaram de ser simulados. Pagamento, upload, receita do painel e cadastro de produtos mantidos como demonstração são identificados nos textos das respectivas telas. Botões, formulários, badges, tabelas e mensagens seguem componentes visuais comuns. | Corrigido |
| 5. Prevenção de erros | Faltavam validações de data futura, pagamento compatível com entrega, confirmações administrativas e proteção contra perda de dados. | Data e horário passados são recusados; endereço é obrigatório para entrega; "Dinheiro na retirada" é bloqueado para entrega; o estoque é validado ao adicionar, alterar quantidade e confirmar; CPF usa dígitos verificadores; ações de indisponibilizar produto e finalizar ou cancelar pedido exigem confirmação. A persistência temporária de formulários ainda não foi implementada. | Parcialmente corrigido |
| 6. Reconhecimento em vez de recordação | Estados vazios não indicavam com clareza o próximo caminho. | Carrinho, catálogo, status, pedidos e estoque apresentam mensagens específicas quando não possuem conteúdo. As telas de status e painel oferecem atalhos para novo pedido, nova encomenda e repetição do último pedido. Alguns estados vazios ainda dependem da navegação principal em vez de apresentar um botão dentro da própria mensagem. | Parcialmente corrigido |
| 7. Flexibilidade e eficiência | Não havia histórico reutilizável, repetição de pedido ou atalhos administrativos. | Foram adicionados "Repetir último pedido", pedidos pendentes, filtro de estoque crítico, busca por número do pedido, novo pedido, nova encomenda e uso do endereço salvo no cadastro. Favoritos e atalhos de teclado não fazem parte do protótipo atual. | Parcialmente corrigido |
| 8. Design estético e minimalista | Clientes visualizavam opções administrativas, aumentando o ruído do menu. | Os links Gerente, Pedidos, Produtos, Estoque e Relatórios iniciam ocultos e só são exibidos quando o perfil possui permissão. Visitantes e clientes não visualizam nem acessam diretamente essas áreas. | Corrigido |
| 9. Diagnóstico e recuperação de erros | Mensagens para CPF, login obrigatório e recuperação após falhas precisavam ser mais específicas. | CPF inválido informa o formato esperado e também é validado no servidor. A finalização sem login explica que é necessário entrar. Erros de estoque, data, endereço e pagamento informam o motivo. Remoções e alterações de status possuem opção de desfazer. Dados digitados ainda não são restaurados após recarregamento ou perda de conexão. | Parcialmente corrigido |
| 10. Ajuda e documentação | Não havia FAQ, ajuda contextual ou guia para o gerente. | Foram adicionados textos curtos nas telas, mensagens de erro orientadas à correção, estados vazios explicativos e descrições nos painéis administrativos. Ainda não existe uma área dedicada de FAQ ou um guia operacional completo dentro do protótipo. | Parcialmente corrigido |

## 3. Pontos do relatório de testes com usuário

O roteiro destacou os seguintes pontos para observação. A situação atual é:

| Ponto de atenção | Tratamento realizado |
|---|---|
| Clareza do acesso à área gerencial | O login recupera o perfil real do usuário. Há perfis Visitante, Cliente, Gerente, Atendente e Confeiteiro/Padeiro. A autorização é aplicada tanto na navegação quanto no acesso direto por hash. |
| Separação entre cliente e gerente | O menu é filtrado por perfil. Gerente acessa todas as telas administrativas; os demais perfis recebem apenas as rotas compatíveis. Usuários sem permissão são enviados ao login ou à tela de acesso negado. |
| Compreensão do pagamento simulado | A tela usa o título "Pagamento simulado". Também impede a combinação incoerente de entrega com "Dinheiro na retirada" e apresenta uma explicação ao usuário. |
| Compreensão dos relatórios simulados | O problema foi eliminado: os relatórios agora usam os dados atuais do protótipo, permitem período e tipo de relatório, podem ser visualizados no navegador e baixados em CSV ou HTML imprimível. |
| Entendimento dos estados vazios | Foram incluídas mensagens específicas para carrinho vazio, ausência de pedidos, resultados de busca, pedidos administrativos e estoque crítico. Há atalhos de continuidade nas telas de status e no painel. |
| Recuperação de erros no cadastro e login | Cadastro valida campos obrigatórios, e-mail, CPF com dígitos verificadores, data de nascimento e perfil. O servidor repete as validações relevantes. Login e falhas de comunicação exibem mensagens claras. |
| Cancelamento e reversão de ações | É possível desfazer remoção do carrinho e alteração de status. Pedidos ainda elegíveis podem ser cancelados. Ações administrativas de maior risco pedem confirmação. |
| Eficiência para usuários frequentes | O usuário pode repetir o último pedido, reutilizar o endereço cadastrado e iniciar rapidamente pedido ou encomenda. A área administrativa possui busca e filtros rápidos. |
| Segurança percebida | Novas senhas não são armazenadas em texto puro. O servidor usa `crypto.scryptSync`, salt individual e comparação com `crypto.timingSafeEqual`; o JSON mantém apenas `senhaHash`. |
| Acessibilidade e baixa familiaridade digital | Foram adicionados controle de fonte normal, grande e muito grande, modo escuro e persistência das preferências em `localStorage`. Textos, estados, botões e mensagens foram mantidos em linguagem direta. |
| Persistência durante perda de conexão | Continua como limitação. As preferências visuais são persistidas, mas os dados temporários de formulários e do carrinho não são restaurados após recarregamento. |
| Ajuda contextual e FAQ | Existem instruções curtas e mensagens contextuais, mas ainda não há FAQ ou central de ajuda dedicada. |
| LGPD e transações criptografadas | O armazenamento de senhas foi reforçado, mas consentimento, política de privacidade, gestão de dados pessoais e transporte HTTPS continuam fora do escopo funcional do protótipo local. |

## 4. Evidências na implementação atual

As principais correções podem ser verificadas nos seguintes arquivos:

- `src/js/app.js`: autorização por perfil, validações, desfazer, cancelamento, atalhos, preferências visuais e mensagens;
- `src/js/routes.js`: menus, formulários, estados vazios, telas administrativas, pagamento e relatórios;
- `src/js/reports.js`: geração real de CSV e HTML imprimível;
- `src/js/server.js`: validação de cadastro, CPF e hash de senha;
- `src/index.html`: navegação protegida e controles de acessibilidade;
- `src/css/styles.css`: tamanhos de fonte, modo escuro e componentes visuais;
- `src/json/users.json`: usuários com perfil e senha armazenada somente como hash;
- `docs/design.md`: documentação das regras ergonômicas, atalhos e relatórios implementados.

## 5. Conclusão

A versão atual resolve os problemas de maior risco identificados na avaliação anterior: acesso administrativo indevido, relatórios apenas simulados, falta de cancelamento e reversão, validações insuficientes e ausência de atalhos para tarefas frequentes. Também melhora acessibilidade e segurança das credenciais.

As pendências concentram-se em recursos complementares: edição de pedidos confirmados, rascunho automático de formulários, restauração do carrinho, FAQ/guia interno, favoritos, atalhos de teclado e requisitos completos de LGPD e transporte seguro. Esses itens devem ser considerados em uma evolução além do protótipo acadêmico.
