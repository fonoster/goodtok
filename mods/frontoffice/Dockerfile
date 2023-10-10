FROM node:lts-alpine
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /build
COPY . /build

RUN apk add --no-cache --virtual .build-deps python3 make g++ \
  && rm -rf node_modules mods/**/node_modules \
  && npm install \
  && cd /build/mods/frontoffice \
  && echo "http://apiserver:5000/v1" > .env \
  && npm run build \
  && rm .env \
  && apk del .build-deps python3 make g++

WORKDIR /build/mods/frontoffice

CMD ["./node_modules/vite/bin/vite.js", "--host", "--port", "3000"]
