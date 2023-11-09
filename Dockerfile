FROM node:20-alpine3.16 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN node ace build --production --ignore-ts-errors

COPY package-lock.json ./build

RUN cd build \
  && npm ci --omit="dev"

FROM node:20-alpine3.16

ARG APP_RELEASE

ENV APP_RELEASE=${APP_RELEASE}
ENV HOST=0.0.0.0
ENV PORT=8080

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 8080
CMD ["node", "server.js"]
