FROM node:18.8.0-alpine as build
WORKDIR ./app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g pm2
CMD ["pm2-runtime", "dist/main.js", "-i", "max"]