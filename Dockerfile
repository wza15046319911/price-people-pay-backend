FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# 安装依赖
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "api/index.js"]