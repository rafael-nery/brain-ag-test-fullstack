# Brain Agriculture - Sistema de Gerenciamento de Produtores Rurais

Este é um projeto fullstack desenvolvido com React (Frontend) e NestJS (Backend) para gerenciamento de produtores rurais.

## 🌐 Links do Projeto

### Frontend
- Produção: [https://brain-ag-front.webseekers.com.br/](https://brain-ag-front.webseekers.com.br/)

### Backend
- API: [https://brain-ag-api.webseekers.com.br](https://brain-ag-api.webseekers.com.br)
- Swagger: [https://brain-ag-api.webseekers.com.br/api](https://brain-ag-api.webseekers.com.br/api)

## 🔑 Acessando o Sistema

### Frontend
- Email: `user@brain.agr.br`
- Senha: `123456`

## 🔌 Endpoints da API

### Produtores
```
GET    /producers            # Lista todos os produtores
POST   /producers            # Cria um novo produtor
GET    /producers/:id        # Obtém um produtor específico
PUT    /producers/:id        # Atualiza um produtor
DELETE /producers/:id        # Remove um produtor
```

### Dashboard
```
GET    /producers/dashboard/totals    # Obtém estatísticas do dashboard
```

### Formato dos Dados

#### Criar/Atualizar Produtor
```typescript
{
  cpfCnpj: string;          // CPF ou CNPJ do produtor
  name: string;             // Nome do produtor
  farmName: string;         // Nome da fazenda
  city: string;             // Cidade
  state: string;            // Estado (UF)
  totalArea: number;        // Área total em hectares
  arableLand: number;       // Área agricultável em hectares
  vegetationArea: number;   // Área de vegetação em hectares
  crops: string[];          // Lista de culturas plantadas
}
```

#### Resposta do Dashboard
```typescript
{
  totalFarms: number;       // Total de fazendas
  totalArea: number;        // Área total em hectares
  stateDistribution: [{     // Distribuição por estado
    state: string;
    count: number;
    percentage: number;
  }];
  cropDistribution: [{      // Distribuição por cultura
    crop: string;
    count: number;
    percentage: number;
  }];
  landUseDistribution: {    // Distribuição do uso do solo
    arableLand: number;
    vegetationArea: number;
    arableLandPercentage: number;
    vegetationAreaPercentage: number;
  };
}
```

# 📁 Estrutura do Projeto

O projeto está organizado em uma estrutura monorepo:

```
brain-ag-test-fullstack/
├── frontend/          # Aplicação React
├── backend/           # API NestJS
└── README.md         # Este arquivo
```

### Frontend (React + TypeScript)
- `/frontend`
    - `/src`
        - `/components`   # Componentes reutilizáveis
        - `/pages`        # Páginas da aplicação
        - `/hooks`        # Custom hooks
        - `/store`        # Redux store e slices
        - `/types`        # TypeScript types/interfaces
        - `/utils`        # Utilitários
        - `/constants`    # Constantes
        - `/assets`       # Assets estáticos

### Backend (NestJS + TypeScript)
- `/backend`
    - `/src`
        - `/producer`     # Módulo de produtores
        - `/common`       # Código compartilhado
        - `/config`       # Configurações
        - `/database`     # Migrations e seeds

## 🚀 Tecnologias

### Frontend
- React 18 + TypeScript
- Redux Toolkit + Redux Persist
- Tailwind CSS
- Shadcn/ui
- Recharts
- React Router DOM
- Axios
- React Hook Form
- Docker

### Backend
- NestJS + TypeScript
- PostgreSQL + TypeORM
- Swagger
- Class Validator
- Docker

## 💻 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm
- Docker e Docker Compose
- PostgreSQL (se executar localmente)

## 🔨 Instalação e Execução

### Usando Docker (Recomendado)

1. Clone o repositório
```bash
git clone https://github.com/rafael-nery/brain-ag-test-fullstack.git
cd brain-ag-test-fullstack
```

2. Inicie os serviços
```bash
# Frontend
cd frontend
docker-compose up -d

# Backend
cd ../backend
docker-compose up -d
```

### Instalação Local

1. Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```

2. Backend
```bash
cd backend
pnpm install
pnpm run start:dev
```

## 📊 Funcionalidades

- Dashboard com análises
    - Total de fazendas
    - Área total em hectares
    - Distribuição por estado
    - Distribuição por cultura
    - Uso do solo

- Gestão de Produtores
    - CRUD completo
    - Validações de dados
    - Filtros e paginação

## 🧪 Testes

### Frontend
```bash
cd frontend
pnpm run test
```

### Backend
```bash
cd backend
pnpm run test
```

## 📝 Scripts Disponíveis

### Frontend
```bash
pnpm run dev          # Desenvolvimento
pnpm run build        # Build
pnpm run preview      # Preview do build
pnpm run lint         # Lint
```

### Backend
```bash
pnpm run start:dev    # Desenvolvimento
pnpm run build        # Build
pnpm run start:prod   # Produção
pnpm run test         # Testes
```

## 🐳 Docker

### Frontend
```bash
# Desenvolvimento
docker-compose up -d

# Produção
docker-compose -f docker-compose.prod.yml up -d
```

### Backend
```bash
docker-compose up -d
```

## 📫 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ⚙️ Variáveis de Ambiente

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/brain_agriculture
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Rafael Nery - [GitHub](https://github.com/rafael-nery)

## 📧 Contato

Se você tiver alguma dúvida ou sugestão, por favor abra uma issue no repositório.