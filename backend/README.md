# Rural Producer API

API REST para gerenciamento de produtores rurais, incluindo detalhes sobre suas propriedades, áreas de cultivo e culturas.

## 🚀 Tecnologias Utilizadas

- **Backend Framework**: NestJS com TypeScript
- **Banco de Dados**: PostgreSQL com TypeORM
- **Logging**: Winston
- **Documentação**: Swagger/OpenAPI
- **Containerização**: Docker e Docker Compose
- **Gerenciador de Pacotes**: pnpm
- **Validação**: class-validator e custom validators
- **Testes**: Jest e Supertest

## 🔧 Pré-requisitos

- Node.js (v20.16.0 ou superior)
- pnpm (8.x ou superior)
- Docker e Docker Compose (para ambiente containerizado)
- PostgreSQL 15 (se executando localmente)

## 🛠️ Configuração

1. Clone o repositório:
```bash
git clone https://github.com/rafael-nery/brain-ag-test-fullstack.git
cd brain-ag-test-fullstack/backend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.docker
```

4. Configure o ambiente de desenvolvimento:
```bash
# Inicie os containers
docker compose up -d

# Aguarde os serviços iniciarem e execute as migrações
pnpm run migration:run:docker

# Execute o seed (opcional)
pnpm run seed:run:docker
```

## 🚦 Executando a Aplicação

### Ambiente de Desenvolvimento (com Docker)

```bash
# Inicia todos os serviços
docker compose up -d

# Acompanha os logs
docker compose logs -f app
```

### Ambiente Local (sem Docker)

```bash
# Desenvolvimento
pnpm run start:dev

# Produção
pnpm run build
pnpm run start:prod
```

## 📚 Documentação da API

- Swagger UI: http://localhost:3000/api
- Documentação OpenAPI: http://localhost:3000/api-json

## ✅ Testes

```bash
# Testes unitários
pnpm run test

# Testes E2E
pnpm run test:e2e

# Cobertura de testes
pnpm run test:cov
```

## 📦 Estrutura do Projeto

```
backend/
├── src/
│   ├── common/          # Código compartilhado (validators, etc)
│   ├── config/          # Configurações (TypeORM, Winston, etc)
│   ├── producer/        # Módulo de produtores
│   │   ├── dto/        # Data Transfer Objects
│   │   ├── entity/     # Entidade Producer
│   │   └── tests/      # Testes unitários
│   └── logging/        # Serviço de logging
├── test/               # Testes E2E
└── docker/            # Configurações Docker
```

## 🔍 Características

- **Validações Customizadas**: CPF/CNPJ e áreas
- **Soft Delete**: Exclusão lógica de registros
- **Logging**: Registro detalhado de operações
- **Documentação**: API totalmente documentada com Swagger
- **Testes**: Cobertura de testes unitários e E2E
- **Docker**: Ambiente isolado e reproduzível

## 🌱 Regras de Negócio

- Validação de CPF/CNPJ
- Área agricultável e vegetação não podem exceder área total
- Pelo menos uma cultura deve ser informada
- Dados de auditoria (criação, atualização, remoção)

## 🔒 Endpoints

```
POST   /producers      # Criar produtor
GET    /producers      # Listar produtores
GET    /producers/:id  # Buscar produtor por ID
PUT    /producers/:id  # Atualizar produtor
DELETE /producers/:id  # Remover produtor
GET    /producers/dashboard/totals  # Estatísticas
```

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## 📄 Licença

Este projeto está sob a licença MIT - veja [LICENSE.md](LICENSE.md) para detalhes.
