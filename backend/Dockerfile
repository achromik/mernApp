FROM node:latest

ENV BACKEND_PATH /backend
WORKDIR ${BACKEND_PATH}

EXPOSE 5000

COPY package.json yarn.lock ./
RUN yarn

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

COPY . .
CMD sh -c '/wait && yarn prod'

