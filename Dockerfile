FROM node:16

WORKDIR /app

COPY . .

RUN yarn install && yarn build

CMD ["node", "build/index.js"]