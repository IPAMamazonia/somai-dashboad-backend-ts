FROM node:alpine

WORKDIR /var/www

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]