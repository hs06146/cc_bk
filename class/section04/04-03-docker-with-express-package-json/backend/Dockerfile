# 1. 운영체제 및 프로그램 설치 (하나하나 입력하는 방식)
# FROM ubuntu:22.04

# # install nodejs
# RUN sudo apt install nodejs
# # install yarn
# RUN sudo npm install -g yarn


# 1. 운영체제 및 프로그램 설치 (이미 Linux, node, npm, yarn 까지 모두 깔려있는 컴퓨터 다운로드 하는 방식)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir myfolder ==> 아래에서 COPY할 때 자동으로 만들어주므로 굳이 필요 없음.
COPY ./package.json /myfolder
COPY ./yarn.lock /myfolder
WORKDIR /myfolder
RUN yarn install
COPY . /myfolder/

# 3. 도커 안에서 index.js 실행시키기
CMD yarn start:dev

# docker build
# docker run [IMAGE ID]
# docker ps
# docker exec -it [CONTAINER ID] /bin/bash