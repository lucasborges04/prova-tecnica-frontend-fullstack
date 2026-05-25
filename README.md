# Prova Técnica — Frontend / Fullstack

Aplicação web desenvolvida em React + Vite para consumo da API REST disponibilizada pela empresa na prova técnica.

## Como rodar o projeto

1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

2. Entrar na pasta do projeto

```bash
cd nome-do-repositorio
```

3. Instalar as dependências

```bash
npm install
```

## Configurar as variáveis de ambiente

1. Crie um arquivo `.env` na raiz do projeto (no mesmo nível do `package.json`) seguindo exemplo do arquivo `.env.example` e preencha os campos necessários.

Exemplo:

- VITE_API_URL=URL_base_da_API
- VITE_API_TOKEN=TOKEN_da_API

## Executar o projeto

1. Após instalar as dependência e configurar o `.env`, execute no terminal:

```bash
npm run dev
```

O Vite iniciára o servidor de desenvolvimento local.

Provavelmente:

```bash
http://localhost:5173/
```

Copie e cole esse caminho no seu navegador para ver a aplicação rodando.

# Funções implementadas

- Cadastro de usuário (nome, email e senha)
- Verificação de email
- Tela para validar código recebido
- Login
- Perfil do usuário autenticado
- Recuperação de senha
- Redefinição de senha

# Objetivo da Aplicação

O sistema consome a API fornecida pela empresa para validar:

- Integração HTTP
- Consumo de API REST
- Tratamento de autenticação
- Organização de frontend
- Fluxo de autenticação completo
- Boas práticas de desenvolvimento
