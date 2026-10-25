# Dashboard Ford · Sprint Angular

Aplicação em Angular com **login**, **página inicial** e **dashboard de veículos** que consome uma API REST local. Desafio da sprint de Angular do **Ford Enter**.

## Funcionalidades

- Login com usuário e senha validados pela API
- Rotas protegidas: `/home` e `/dashboard` só abrem com o usuário logado (guard `authGuard`)
- Dashboard com dados dos veículos vindos da API
- Módulos carregados sob demanda (*lazy loading*) para login, home e dashboard

## Tecnologias

- Angular 20 e TypeScript
- RxJS e `HttpClient`
- Bootstrap

## Como rodar

O front-end espera uma API rodando em `http://localhost:3001` (rotas `/login` e de veículos), fornecida junto com o desafio.

```bash
npm install
npm start
```

Depois abra `http://localhost:4200/`.

## Estrutura

```
src/app/
├── login/       → tela e módulo de login
├── home/        → página inicial
├── dashboard/   → painel de veículos
├── guards/      → proteção das rotas
├── services/    → autenticação e dados de veículos
└── models/      → usuário, veículo e dados do veículo
```

---

Feito por [Kézia Carneiro](https://github.com/keziazcs).
