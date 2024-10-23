# Contribuindo para Rural Producer API

Agradecemos seu interesse em contribuir com o projeto! Este documento fornece guidelines para contribuições.

## 🚀 Processo de Desenvolvimento

1. Fork o projeto
2. Configure o ambiente de desenvolvimento
3. Crie um branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
5. Push para o branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 🔍 Padrões de Código

### Estilo
- Use TypeScript
- Siga os padrões do ESLint configurados
- Use Prettier para formatação
- Mantenha a organização de pastas existente

### Commits
Utilizamos Conventional Commits:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` alteração em documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adição/modificação de testes
- `chore:` alterações em build, configurações, etc

### Testes
- Adicione testes para novas funcionalidades
- Mantenha ou aumente a cobertura de testes
- Execute `pnpm test` antes de commitar

## 📝 Pull Requests

### Checklist
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Código formatado com Prettier
- [ ] Lint passa sem erros
- [ ] Testes passam
- [ ] Branch atualizado com main

### Template de PR
```markdown
## Descrição
Descreva brevemente suas alterações

## Tipo de mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Testes
Descreva os testes que você executou

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Fiz review do meu próprio código
- [ ] Comentei código complexo
- [ ] Atualizei a documentação
- [ ] Meus commits seguem o padrão convencional
```

## 🐛 Reportando Bugs

### Template de Issue
```markdown
## Descrição
Uma descrição clara do bug

## Para Reproduzir
Passos para reproduzir o comportamento:
1. Vá para '...'
2. Clique em '....'
3. Veja o erro

## Comportamento Esperado
O que deveria acontecer

## Screenshots
Se aplicável, adicione screenshots

## Ambiente
- OS: [e.g. Ubuntu 20.04]
- Node Version: [e.g. 20.16.0]
- pnpm Version: [e.g. 8.6.0]
```

## 💡 Sugestões de Melhorias

Use o template de issue mas marque como "enhancement" e inclua:
- Problema que sua sugestão resolve
- Benefícios da implementação
- Possíveis desvantagens ou riscos

## 📚 Recursos Adicionais

- [Documentação do NestJS](https://docs.nestjs.com/)
- [TypeORM Docs](https://typeorm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
