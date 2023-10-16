FROM node:lts-alpine
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /build
COPY . /build

RUN apk add --no-cache --virtual .build-deps python3 make g++ \
  && rm -rf node_modules mods/**/node_modules \
  && echo "http://apiserver:6789/v1" > /build/mods/frontoffice/.env \
  && npm install \
  && npm run build \
  && rm /build/mods/frontoffice/.env \
  && apk del .build-deps python3 make g++

WORKDIR /build/mods/frontoffice

CMD ["./node_modules/vite/bin/vite.js", "--host", "--port", "8080"]
