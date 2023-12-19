FROM node:bookworm-slim as build

RUN npm install -g pnpm
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot
COPY package.json /usr/src/bot
RUN pnpm i
COPY . /usr/src/bot
RUN pnpm run build
CMD ["node", "build/app.js"]