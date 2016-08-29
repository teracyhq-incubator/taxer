FROM node:4.4

ENV HOME=/usr/src

COPY package.json $HOME/

WORKDIR $HOME
RUN rm -rf node_modules && npm cache clean && npm install
