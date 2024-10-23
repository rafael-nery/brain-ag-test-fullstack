# Sistema de Gerenciamento de Produtores Rurais - Frontend

Este é o frontend do sistema de gerenciamento de produtores rurais, desenvolvido com React. O sistema permite o cadastro de produtores rurais e fornece um dashboard com análises dos dados.

## 🚀 Tecnologias

- React 18 + TypeScript
- Redux Toolkit + Redux Persist para gerenciamento de estado
- Tailwind CSS para estilização
- Shadcn/ui para componentes de UI
- Recharts para visualização de dados
- React Router DOM para roteamento
- Axios para requisições HTTP
- React Hook Form para formulários
- Radix UI para componentes base
- TanStack Table para tabelas
- Docker para containerização

## 💻 Pré-requisitos

Antes de começar, verifique se você tem os seguintes requisitos instalados:
- Node.js (versão 18 ou superior)
- pnpm ou yarn
- Docker e Docker Compose

## 🔨 Instalação

### Usando Docker (Recomendado)

1. Clone o repositório
```bash
git clone https://github.com/rafael-nery/brain-ag-test-fullstack.git
```

2. Acesse a pasta do projeto
```bash
cd brain-ag-test-fullstack/frontend
```

3. Inicie com Docker Compose
```bash
docker-compose up -d
```

O frontend estará disponível em `http://localhost:5173`

### Instalação Local

1. Clone o repositório
```bash
git clone https://github.com/rafael-nery/brain-ag-test-fullstack.git
```

2. Acesse a pasta do projeto
```bash
cd brain-ag-test-fullstack/frontend
```

3. Instale as dependências
```bash
pnpm install
```

4. Inicie o servidor de desenvolvimento
```bash
pnpm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🔑 Acesso ao Sistema

Para acessar o sistema, utilize as seguintes credenciais:

- **Email**: user@brain.agr.br
- **Senha**: 123456

## 🐳 Docker

### Comandos Úteis

```bash
# Iniciar os containers
docker-compose up -d

# Parar os containers
docker-compose down

# Visualizar logs
docker-compose logs -f

# Reconstruir os containers
docker-compose up -d --build

# Remover volumes (caso necessário)
docker-compose down -v
```

### Estrutura Docker

O projeto utiliza:
- Dockerfile para desenvolvimento
- Docker Compose para orquestração
- Volumes para hot-reload
- Proxy reverso para API

### Variáveis de Ambiente

```bash
# .env
VITE_API_URL=http://host.docker.internal:3000
```

## 📊 Funcionalidades

### Dashboard
- Total de fazendas em quantidade
- Total de fazendas em hectares (área total)
- Gráfico de pizza por estado
- Gráfico de pizza por cultura
- Gráfico de pizza por uso de solo (Área agricultável e vegetação)

### Gestão de Produtores
- Listagem de produtores com paginação e filtros
- Cadastro de novo produtor
- Edição de produtor existente
- Exclusão de produtor
- Visualização detalhada de produtor

## 📝 Validações do Frontend

### Produtor Rural
- CPF/CNPJ válido (com validação)
- Nome do produtor
- Nome da Fazenda
- Cidade
- Estado
- Área total em hectares
- Área agricultável em hectares
- Área de vegetação em hectares
- Culturas plantadas (múltipla escolha)

### Regras de Negócio
- A soma de área agricultável e vegetação não pode ser maior que a área total da fazenda
- Todas as áreas devem ser maiores que 0
- Deve ser selecionada pelo menos uma cultura
- CPF/CNPJ deve ser válido

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build
pnpm run build

# Preview do build
pnpm run preview

# Lint
pnpm run lint
```

## 📚 Principais Dependências

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.27.0",
    "recharts": "^2.13.0",
    "redux-persist": "^6.0.0"
  }
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📫 Contato

Se você tiver alguma dúvida ou sugestão, por favor abra uma issue no repositório.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.