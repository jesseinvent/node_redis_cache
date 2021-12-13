FROM node:16

RUN npm install -g npm@8.1.3

WORKDIR /app

COPY . .

RUN npm i

CMD ["npm", "start"]
