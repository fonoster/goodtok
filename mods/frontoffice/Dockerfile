FROM node:lts-alpine
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /service
COPY mods/frontoffice/dist .

CMD npx serve -s . -l 8080
