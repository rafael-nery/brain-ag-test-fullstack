# Brain Agriculture - Sistema de Gerenciamento de Produtores Rurais

Este é um projeto fullstack desenvolvido com React (Frontend) e NestJS (Backend) para gerenciamento de produtores rurais.

## 📁 Estrutura do Projeto

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

## 🔑 Acessando o Sistema

### Frontend
- URL: `http://localhost:5173`
- Email: `user@brain.agr.br`
- Senha: `123456`

### Backend
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api`

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