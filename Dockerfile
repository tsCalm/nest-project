# step 1 도커 파일을 활용한 build

FROM node:18 AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build

# step 2 도커 파일 내에서 앱 실행
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3000
CMD ["npm", "run", "start:dev"]