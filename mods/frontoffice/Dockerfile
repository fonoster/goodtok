FROM node:lts-alpine
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /service
COPY mods/frontoffice/dist .

ENV API_ENDPOINT=https://api.goodtok.io/v1

RUN npm install -g serve

CMD sed -i 's|https://api.goodtok.io/v1|'"$API_ENDPOINT"'|g' ./index.html && serve -s . -l tcp://0.0.0.0:8080
