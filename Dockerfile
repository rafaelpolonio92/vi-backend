FROM node:16

RUN apt-get update && \
      apt-get -y install sudo

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install

COPY src src

CMD [ "npm", "run", "build" ]