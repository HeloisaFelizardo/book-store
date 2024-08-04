# Use a imagem do Node.js para rodar a aplicação
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .. .
EXPOSE 5000
CMD ["npm", "run", "dev"]
