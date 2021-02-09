FROM node:10-alpine as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node .. .
RUN npm run build

FROM nginx:alpine

COPY ../.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/node/app/dist/src /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
