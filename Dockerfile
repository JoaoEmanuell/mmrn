FROM node:lts-alpine3.19

RUN apk add bash

WORKDIR /home/node/app

EXPOSE 8080

CMD tail -f /dev/null