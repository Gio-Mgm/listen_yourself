FROM node:18-alpine3.14

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

EXPOSE 8080