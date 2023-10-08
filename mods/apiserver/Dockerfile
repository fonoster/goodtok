##
## Build
##
FROM node:lts-alpine as builder
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /build
COPY . .

RUN apk add --no-cache --update && \
  npm install && \
  npm run build && \
  npm pack

##
## Runner
##
FROM node:lts-alpine as runner

COPY --from=builder /build/apiserver-*.tgz .

RUN apk add --no-cache --update && \
  npm install -g apiserver-*.tgz && \
  rm -rf apiserver-*.tgz

CMD [ "goodtok" ]