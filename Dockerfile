FROM node:18.8.0-alpine as build
WORKDIR ./app
COPY package.json ./
RUN bun install
COPY . .
RUN bun install -g pm2
CMD ["pm2-runtime", "dist/main.js", "-i", "max"]