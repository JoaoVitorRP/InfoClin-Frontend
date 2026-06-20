FROM node:24-alpine
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Expõe a porta que o Vite usa localmente por padrão
EXPOSE 5173

# Executa o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]