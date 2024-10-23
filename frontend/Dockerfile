FROM node:18-alpine

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@9.12.2 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Expose port
EXPOSE 5173

# Start development server com configurações específicas para Docker
ENV CHOKIDAR_USEPOLLING=true
CMD ["pnpm", "run", "dev", "--", "--host", "--port", "5173"]