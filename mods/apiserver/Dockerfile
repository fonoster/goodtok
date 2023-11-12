FROM node:lts-alpine as builder
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /service
COPY mods/apiserver .

ENV DOCKERIZE_VERSION v0.7.0

RUN apk add --no-cache --update \
  && npm pack \
  && npm install -g goodtok-apiserver-*.tgz \
  && cp schema.prisma /usr/local/lib/node_modules/@goodtok/apiserver/ \
  && cd /usr/local/lib/node_modules/@goodtok/apiserver/ \
  && npx prisma generate \
  && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm -rf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz goodtok-apiserver-*

# TODO: Fix hardcode host for db
CMD sh -c "dockerize -wait tcp://postgres:5432 -timeout 30s && \
  npx prisma migrate deploy && \
  goodtok"