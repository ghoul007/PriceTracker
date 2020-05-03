FROM node:10-alpine as dist
WORKDIR /tmp/
COPY package.json ./
COPY . .
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN npm install

FROM node:10-alpine
RUN apk --no-cache upgrade && apk add --no-cache \
    udev \
    chromium
WORKDIR /app
ENV CHROME_BIN="/usr/bin/chromium-browser"
COPY --from=dist /tmp ./dist
CMD ["node", "dist/index.js"]