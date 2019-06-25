FROM node:latest

WORKDIR /frontend

RUN apt-get -q update
RUN apt-get -q -y install nginx

COPY . .
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

RUN yarn
RUN yarn build

CMD nginx -g "daemon off;"
