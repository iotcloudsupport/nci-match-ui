# Base image 
#FROM node:onbuild
#EXPOSE 9000

FROM node:4.4.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app

RUN bower install
RUN bower update

#CMD [ "npm", "start" ]
CMD [ "grunt", "live" ]
