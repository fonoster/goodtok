##
## Build
##
FROM node:lts-alpine as builder
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /build
COPY mods/apiserver .

RUN apk add --no-cache --update \
  && npm pack \
  && npm install -g goodtok-apiserver-*.tgz \
  && cp schema.prisma /usr/local/lib/node_modules/@goodtok/apiserver/ \
  && cd /usr/local/lib/node_modules/@goodtok/apiserver/ \
  && npx prisma generate \
  && rm -rf goodtok-apiserver-*.tgz

CMD [ "goodtok" ]
