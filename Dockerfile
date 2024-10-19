FROM "ubuntu"

RUN apt-get update

RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y git

WORKDIR /server
COPY . /server
# RUN --mount=type=bind,source=/,target=/server
RUN npm install
EXPOSE 3000

CMD [ "npm", "start" ]