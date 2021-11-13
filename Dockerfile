FROM node:16.13.0-alpine

RUN apk add --no-cache --virtual .gyp python3 make g++

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn && \
    apk del .gyp

COPY . .

RUN yarn pre:build && yarn build

CMD yarn start