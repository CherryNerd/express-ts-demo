FROM node:14.16-alpine as base
WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i

COPY src/ ./src

############################ 

FROM base as production

RUN npm run build
