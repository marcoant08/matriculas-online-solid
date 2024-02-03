# Matrículas Online

## Cenário

Um funcionário de uma instituição de ensino precisa gerenciar alunos de turmas online, realizando as matrículas dos alunos nas turmas.

## Sobre

Sistema feito com **Node.js** e **TypeScript** aplicando conceitos de **SOLID**, **Clean Code** e **Clean Architecture**
Também foram implementados **Testes** com **Jest**

## Variáveis de ambiente

Crie um arquivo .env e cole as variáveis a seguir (essas variáveis podem ser alteradas):

```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=enrollments-db
```

## Como executar a aplicação

Execute os comandos a seguir:

```
> npm install
> docker-compose up
> npx prisma migrate dev
> npx prisma generate
> npm run dev
```

## Como executar os testes

Para testar, execute os comandos a seguir:

```
> npm install
> npm run test
```

Para testar e apresentar a cobertura de código, execute os comandos a seguir:

```
> npm install
> npm run test:cov
```

## Mais

- O banco de dados (PostgreSQL) está configurado pra usar 64MB, esta configuração pode ser alterada em `./postgres_custom/postgresql.conf`
