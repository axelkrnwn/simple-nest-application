FROM node:23-alpine

WORKDIR /app
COPY ./linkasa-backend/package*.json ./
RUN npm install
COPY ./linkasa-backend .


CMD ["node", "dist/main"]

