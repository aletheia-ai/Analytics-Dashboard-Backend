FROM node:18.8.0-alpine as build

RUN apk add --no-cache curl

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR ./app
COPY package.json ./
RUN bun install
COPY . .
RUN bun install -g pm2
CMD ["pm2-runtime", "dist/main.js", "-i", "max"]