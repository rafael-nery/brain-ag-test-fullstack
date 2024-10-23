#!/bin/sh

set -e

check_db() {
  echo "Waiting for database to be ready..."
  max_retries=30
  counter=0

  while ! nc -z db 5432; do
    counter=$((counter+1))
    if [ $counter -ge $max_retries ]; then
      echo "Error: Failed to connect to database after $max_retries attempts"
      exit 1
    fi
    echo "Attempt $counter of $max_retries: Database is not ready. Waiting..."
    sleep 2
  done
  echo "Database is ready!"
}

check_migration_files() {
  echo "Checking for migration files..."
  migration_count=$(find src/database/migrations -name "*.ts" 2>/dev/null | wc -l)

  if [ "$migration_count" -eq 0 ]; then
    echo "No migration files found. Generating initial migration..."
    if ! pnpm run migration:generate:docker; then
      echo "Error: Failed to generate initial migration"
      exit 1
    fi
    echo "Initial migration generated successfully"
  else
    echo "Found $migration_count migration files"
  fi
}

check_migrations() {
  echo "Checking pending migrations..."
  if ! pnpm run migration:run:docker > /dev/null 2>&1; then
    echo "Error: Migration check/execution failed"
    exit 1
  fi
  echo "Migrations check completed"
}

check_seeds() {
  echo "Checking if seeds need to be run..."

  # Usa uma query simples para verificar se existem dados
  if ! pnpm run typeorm query "SELECT EXISTS (SELECT 1 FROM producer LIMIT 1)" -d src/config/typeorm.config.ts 2>/dev/null | grep -q "true"; then
    echo "No data found. Running seeds..."
    if ! pnpm run seed:run:docker; then
      echo "Error: Seeding failed"
      exit 1
    fi
    echo "Seeds completed successfully"
  else
    echo "Data already exists, skipping seeds"
  fi
}

start_app() {
  echo "Starting the application..."
  NODE_ENV=production exec node dist/main.js
}

# Main execution
check_db
check_migration_files
check_migrations
check_seeds
start_app