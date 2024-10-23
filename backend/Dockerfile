# Base image
FROM node:20-alpine

# Install necessary tools
RUN apk add --no-cache netcat-openbsd

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Build the application
RUN pnpm run build

# Make start.sh executable
RUN chmod +x start.sh

# Start the server using production build
CMD ["./start.sh"]