FROM node:lts-alpine
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /service
COPY mods/frontoffice/dist .

ENV API_ENDPOINT=https://api.goodtok.io/v1

RUN npm install -g serve

CMD sed -i 's|http://localhost:6789/v1|'"${API_ENDPOINT}"'|g' /service/index.html && serve -s . -l tcp://0.0.0.0:8080
