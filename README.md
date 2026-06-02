# Título do Projeto

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Design de Centrado no Usuário`

`SEMESTRE: 3º`

Desenvolver um sistema digital para gestão de encomendas em panificadoras e confeitarias, integrado a um aplicativo de pedidos, que permita aos clientes realizar reservas e encomendas de produtos.

## Integrantes

* Henrique Augusto Freire de Oliveira
* Daniella Ferreira Coutinho
* Antônio Vicente da Cruz
* Ruano Barros Pereira
* Leonardo Henrique Soares dos Reis
* Guilherme Henrique Santos Arantes

## Orientadora

* Maria Ines Lage de Paula 

# Planejamento

| Etapa         | Atividades |
|  :----:   | ----------- |
| ETAPA 1         |[Introdução](docs/introducao.md) <br> [Estado da Arte](docs/estado.md) <br> [Referências](docs/referencias.md) |
| ETAPA 2         |[Especificação de Requisitos de Software](docs/especificacao.md) |
| ETAPA 3         |[Design de Interação](docs/design.md) |
| ETAPA 4        |[Testes de Software](docs/testes.md) |
| ETAPA 5         | [Apresentação](docs/apresentacao.md) |


# Código

<li><a href="src/codigo.md"> Código Fonte</a></li>

### Instruções para rodar o servidor

Requisitos:

- Ter o node.js baixado no PC:
https://nodejs.org/en/download

- Rodar o comando "npm start" enquanto dentro da pasta base do projeto.

Em caso de erro Windows:
"npm : File C:\******\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.":

Abra o powershell e use o comando 
- Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
	
Isso faz com que seja possível rodar scripts locais, mas quaisquer script externo deve ser assinado por um publicador confiável.

### Estratégia de segurança de senhas

O cadastro não grava novas senhas em texto puro. Como o projeto permanece sem dependências externas, o servidor usa `crypto.scryptSync` do Node.js com salt aleatório por usuário e compara o hash no login com `crypto.timingSafeEqual`.

O arquivo `src/json/users.json` deve armazenar apenas `senhaHash`, no formato `scrypt$N$r$p$salt$hash`. Antes de qualquer uso fora do protótipo acadêmico, as credenciais de exemplo devem ser substituídas por contas reais criadas pelo fluxo de cadastro ou por uma rotina de seed segura. Caso o projeto passe a aceitar dependências externas, a migração para uma biblioteca consolidada como `bcrypt` ou `argon2` deve ser tratada como obrigatória antes da entrega final em produção.

# Apresentação

<li><a href="docs/apresentacao.md"> Apresentação da solução</a></li>
