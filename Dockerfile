##
## Build
##
FROM node:lts-alpine as builder
LABEL Fonoster Team <fonosterteam@fonoster.com>

WORKDIR /build
COPY . .

RUN npm install && npm run build

##
## Runner
##
FROM gcr.io/distroless/nodejs:18 as runner

COPY --from=builder /build/dist/bundle.js /app/bundle.js

WORKDIR /app

CMD ["./bundle.js"]