FROM node:4.5

MAINTAINER hoatle <hoatle@teracy.com>

# pattern YYYMMDD:HHMMSS
# update this when we want to rebuild the image, for example, to update npm modules
ENV REFRESHED_AT 20160829:121700

ENV HOME=/usr/src

COPY package.json $HOME/

WORKDIR $HOME
RUN rm -rf node_modules && npm cache clean && npm install
