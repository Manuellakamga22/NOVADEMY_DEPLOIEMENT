FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:5001/ || exit 1

CMD ["node", "server.js"]
