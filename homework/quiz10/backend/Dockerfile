FROM node:16

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install
COPY . /myfolder/

# 3. 도커 안에서 index.js 실행시키기
CMD yarn start:dev