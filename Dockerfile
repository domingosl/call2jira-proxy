FROM node:16-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app

COPY package.json .
RUN npm install --omit=dev

COPY . .

EXPOSE 3030

CMD node index.js