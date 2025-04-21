FROM node:lts-alpine AS Builder
WORKDIR /service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine
WORKDIR /service

COPY package*.json ./
COPY --from=Builder /service/dist ./dist

RUN npm ci --omit=dev