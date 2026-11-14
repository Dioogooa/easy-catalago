# Easy Catalago

Plataforma web para lojistas criarem e administrarem seu catálogo digital próprio, permitindo que visitantes montem carrinhos sem login e encaminhem pedidos organizados diretamente pelo WhatsApp.

> **Status:** Fase 0 concluída (Fundação do projeto). Projeto desenvolvido 100% do zero.

---

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack, Server Actions)
- **Linguagem:** TypeScript (Strict mode com `noUncheckedIndexedAccess`)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com)
- **Banco de Dados:** PostgreSQL 16
- **ORM:** [Prisma ORM 6](https://www.prisma.io)
- **Validação:** [Zod](https://zod.dev)
- **Testes Unitários e Integração:** [Vitest](https://vitest.dev)
- **Testes E2E:** [Playwright](https://playwright.dev)
- **Containerização:** Docker & Docker Compose (PostgreSQL + MinIO)
- **Gerenciador de Pacotes:** `pnpm`

---

## 📁 Estrutura de Pastas

```text
EasyCatalago/
├── docker/                 # Configurações adicionais de infraestrutura
├── prisma/
│   ├── schema.prisma       # Modelagem oficial do banco de dados
│   ├── seed.ts             # Script de seed para desenvolvimento
│   └── migrations/         # Histórico versionado de migrações
├── public/                 # Ativos estáticos
├── src/
│   ├── app/
│   │   ├── (auth)/         # Rotas de autenticação (login, cadastro)
│   │   ├── (public)/       # Catálogo público acessível por slug ([storeSlug])
│   │   ├── admin/          # Painel administrativo protegido
│   │   ├── api/            # Route Handlers
│   │   ├── layout.tsx      # Root Layout
│   │   └── page.tsx        # Landing page inicial
│   ├── components/
│   │   ├── admin/          # Componentes do painel do lojista
│   │   ├── catalog/        # Componentes da vitrine pública
│   │   └── ui/             # Componentes base de interface
│   ├── lib/
│   │   ├── auth/           # Configurações de autenticação
│   │   ├── db/             # Prisma client singleton
│   │   ├── storage/        # Abstração de Object Storage (MinIO / S3)
│   │   ├── validations/    # Schemas Zod compartilhados
│   │   └── whatsapp/       # Gerador de links e mensagens do WhatsApp
│   ├── modules/            # Módulos de domínio de negócio isolados
│   ├── types/              # Tipos TypeScript compartilhados
│   └── middleware.ts       # Proteção de rotas e proxy
├── tests/
│   ├── unit/               # Testes unitários (Vitest)
│   ├── integration/        # Testes de integração (Vitest)
│   ├── e2e/                # Testes ponta a ponta (Playwright)
│   └── setup.ts            # Configuração do ambiente de testes
├── docker-compose.yml      # Serviços: PostgreSQL 16 + MinIO Storage
├── Dockerfile              # Imagem de produção multi-stage
├── vitest.config.ts        # Configuração do Vitest
└── playwright.config.ts    # Configuração do Playwright
```

---

## 🚀 Como Iniciar o Projeto

### Pré-requisitos
- [Node.js 22+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/)
- [Docker & Docker Compose](https://www.docker.com/)

### 1. Clonar e instalar dependências
```bash
git clone <url-do-repositorio>
cd EasyCatalago
pnpm install
```

### 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo e ajuste se necessário:
```bash
cp .env.example .env
```

### 3. Subir os serviços com Docker
```bash
docker compose up -d
```
Isso iniciará:
- **PostgreSQL 16**: `localhost:5432` (banco: `easycatalago_dev`)
- **MinIO Object Storage**: `localhost:9000` (Console web: `localhost:9001`)

### 4. Executar Migrações e Seed do Prisma
```bash
pnpm db:migrate
pnpm db:seed
```

### 5. Iniciar o servidor de desenvolvimento
```bash
pnpm dev
```
Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🧪 Testes e Qualidade de Código

- **Typecheck:**
  ```bash
  pnpm typecheck
  ```
- **Linter:**
  ```bash
  pnpm lint
  ```
- **Testes Unitários / Integração:**
  ```bash
  pnpm test
  ```
- **Testes com Cobertura:**
  ```bash
  pnpm test:coverage
  ```
- **Testes End-to-End (E2E):**
  ```bash
  pnpm test:e2e
  ```
- **Build de Produção:**
  ```bash
  pnpm build
  ```

---

## 🛡️ Banco de Dados e Modelagem (Prisma)

Modelos principais da aplicação:
- `User`: Conta do lojista (1:1 com Store no MVP)
- `Store`: Identidade da loja e slug público único
- `Category`: Categorias ordenáveis pertencentes à loja
- `Product`: Produtos com preço decimal e imagem
- `StoreSettings`: Personalização visual, banner hero e dados de WhatsApp
- `CatalogEvent`: Rastreamento de métricas (views, cliques no WhatsApp, envios de carrinho)

Comandos úteis do banco:
```bash
pnpm db:generate    # Gera o Prisma Client
pnpm db:migrate     # Aplica migrações em desenvolvimento
pnpm db:seed        # Popula o banco com dados de teste
pnpm db:studio      # Abre o Prisma Studio na web
pnpm db:reset       # Reseta o banco e reaplica migrações/seed
```
