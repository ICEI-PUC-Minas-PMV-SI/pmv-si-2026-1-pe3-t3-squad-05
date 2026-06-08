# 5. Plano de Testes de Software

Nesta etapa são utilizados dois métodos complementares:

1. **Avaliação heurística por inspeção:** revisão do protótipo segundo as dez heurísticas de Nielsen.
2. **Teste com usuários por observação:** execução de tarefas por participantes representativos, com registro de sucesso, tempo, erros, dúvidas e comentários.

## 5.1 Documentos da versão atual

- [Avaliação Heurística consolidada](./testes/Avaliacao_Heuristica.xlsx)
- [Relatório consolidado de Testes com Usuário](./testes/Relatorio_de_Testes_com_Usuario.docx)
- [Correções aplicadas após a avaliação anterior](./correcoes-avaliacao-testes.md)

Os documentos da entrega anterior foram preservados em [`docs/testes/ANTIGO_testes_entrega_3`](./testes/ANTIGO_testes_entrega_3/).

## 5.2 Avaliação heurística

A planilha atual contém uma nova inspeção do protótipo, considerando as funcionalidades implementadas depois da avaliação anterior:

- relatórios reais em CSV e HTML imprimível;
- controle de acesso por perfil;
- validação de CPF com dígitos verificadores;
- prevenção de datas passadas, pagamento incompatível e estoque insuficiente;
- cancelamento e reversão de ações;
- atalhos para usuários frequentes;
- preferências de fonte e modo escuro;
- armazenamento de senhas com hash.

As dez heurísticas possuem avaliação atual, nível do problema remanescente e recomendação de melhoria. A planilha representa a consolidação da inspeção e deve ser revisada pela equipe antes da entrega.

## 5.3 Testes com usuários

A equipe possui seis integrantes. Portanto, o relatório atual define **seis tarefas** e reserva **seis registros de participantes distintos**, um para cada integrante:

| # | Tarefa | Responsável |
|---|---|---|
| 1 | Cadastro, login e preferências visuais | Henrique Augusto Freire de Oliveira |
| 2 | Catálogo, carrinho e reversão | Daniella Ferreira Coutinho |
| 3 | Encomenda, recorrência e agendamento | Antônio Vicente da Cruz |
| 4 | Pagamento, confirmação, status e cancelamento | Ruano Barros Pereira |
| 5 | Controle de acesso e gestão de pedidos | Leonardo Henrique Soares dos Reis |
| 6 | Estoque crítico e relatórios reais | Guilherme Henrique Santos Arantes |

Cada registro individual contém:

- participante, data, dispositivo e perfil representado;
- objetivo e caminho esperado;
- aspectos que devem ser observados;
- tempo aproximado;
- nota de sucesso entre 0 e 2;
- caminho realmente utilizado;
- erros, pedidos de ajuda e comentários;
- conclusão do avaliador.

### Escala de sucesso

| Nota | Critério |
|---|---|
| 0 | Não completou a tarefa. |
| 1 | Completou com dificuldade, demora excessiva ou ajuda. |
| 2 | Completou facilmente, sem ajuda relevante. |

## 5.4 Verificação do atendimento

| Exigência | Situação |
|---|---|
| Avaliação heurística no formato XLSX | Atendida. |
| Dez heurísticas avaliadas | Atendida. |
| Resultados da inspeção compilados em arquivo único | Atendida. |
| Quantidade de tarefas igual à quantidade de integrantes | Atendida: seis tarefas para seis integrantes. |
| Roteiro atualizado para a versão atual do protótipo | Atendida. |
| Um registro individual por integrante | Atendida na estrutura do relatório consolidado. |
| Seis participantes distintos | **Pendente de aplicação presencial ou remota pela equipe.** |
| Tempos, notas, observações e conclusões reais | **Pendente de preenchimento após as sessões.** |
| Consolidação final dos resultados com usuários | **Pendente das seis sessões.** |

