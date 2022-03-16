FROM node:16

RUN apt-get update && \
      apt-get -y install sudo

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install

COPY src src
ENV API_KEY=ac505a02032a33d65dd28b41f72182e1

CMD [ "npm", "run", "build" ]