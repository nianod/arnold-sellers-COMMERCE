FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]