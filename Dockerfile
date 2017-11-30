FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

#RUN npm install pm2 -g

COPY . /usr/src/app/

EXPOSE 9000

#CMD ["pm2-docker", "start-server"]

CMD [ "npm", "run", "start-server" ]