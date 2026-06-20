# InfoClin - Front-end

Este é o repositório do front-end da plataforma **InfoClin**, uma aplicação web desenvolvida em React para permitir o gerenciamento de fichas clínicas e a visualização rápida de dados de emergência através de QR Codes.

## 🛠️ Tecnologias Utilizadas

- **React 19** (com Vite)
- **React Router Dom** para gerenciamento de rotas
- **Axios** para consumo da API do Back-end
- **Docker** (imagem baseada no Node 24-alpine para ambiente local)
- **GitHub Actions** para o deploy

## 🔑 Variáveis de Ambiente Necessárias

O projeto utiliza variáveis de ambiente para gerenciar as URLs de comunicação. Elas devem ser configuradas conforme o modelo do `.env.example` caso deseje rodar o projeto localmente:

- `VITE_API_URL`: URL completa da API do backend.
  - Para desenvolvimento local: Geralmente `http://localhost:8080`.
  - Para produção: A URL gerada no seu provedor de hospedagem (ex: `https://sua-api-no-render.onrender.com`).
- `VITE_FRONT_URL`: URL completa do próprio frontend.
  - Para desenvolvimento local: Geralmente `http://localhost:5173`.
  - Para produção: A URL gerada no seu provedor de hospedagem (ex: `https://seu-usuario.github.io/url-base`).

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos

- Ter o **Node.js v24** instalado na sua máquina (caso vá rodar sem Docker).
- Ter o **Docker Desktop** instalado (caso prefira rodar via container).

### Configuração do .env (necessário para rodar localmente, com ou sem Docker)

1. Vá até a raiz do projeto.
2. Duplique o arquivo `.env.example` e renomeie para `.env`.
3. Edite o `.env` e preencha as variáveis de ambiente com seus dados reais.

### Opção 1: Sem Docker

Execute os comandos abaixo na raiz do projeto:

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento do Vite
npm run dev
```

### Opção 2: Pela Imagem Docker

Para compilar e rodar a imagem localmente pelo terminal, siga os seguintes passos (execute os comandos na raiz do projeto):

```bash
# 1. Construir a imagem Docker
docker build -t infoclin-frontend-img .

# 2. Executar o container injetando as variáveis de ambiente
docker run -p 5173:5173 --env-file .env --name infoclin-frontend infoclin-frontend-img
```
