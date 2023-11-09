# 1. 도커 단답형 퀴즈

## 1-1) 도커 이미지 빌드하기

- **현재 디렉토리에 아래와 같이 파일이 있습니다.**
  > ls
  > aaa.txt Dockerfile index.js readme.md

1. 이때, 도커 이미지를 build 하는 명령어는 무엇인가요?

   정답 > docker build .

2. 위 1번에서 build 한 이미지를 확인하는 명령어는 무엇인가요?

   정답 > docker images

## 1-2) 도커 이미지 실행/제거하기

- **도커 이미지 목록을 확인한 결과 아래와 같습니다.**
  REPOSITORY TAG IMAGE ID CREATED SIZE
  <none> <none> 2e7a05ce7683 5 seconds ago 850MB

1. 해당 이미지를 실행하는 명령어는 무엇인가요?

   정답 > docker run 2e7a05ce7683

1. 도커로 해당 이미지를 실행하면 도커 컨테이너가 실행됩니다. 도커 컨테이너는 무한 루프를 돌거나, 서버와 같이 24시간 listen 하지 않는 경우 실행이 끝나면 자동으로 종료됩니다. 여기서, 현재 실행 중인 도커 컨테이너의 목록을 보는 명령어가 `> docker ps` 일 때, 종료된 컨테이너를 포함한 모든 컨테이너의 목록을 보는 명령어는 무엇인가요?

   정답 > docker ps -a

1. 실행 중인 컨테이너를 중지하는 명령어는 무엇인가요?

   정답 > docker stop [container ID]

1. 종료된 컨테이너를 삭제하는 명령어는 무엇인가요?

   정답 > docker rm [container ID]

1. 이미지를 삭제하는 명령어는 무엇인가요?

   정답 > docker rmi [image ID]

## 1-3) 도커에서 Node.js 서버 실행하기

- **철수가 도커에서 Node.js 기반의 express 서버를 실행하려고 합니다.**
  `**3000`번 포트로 listen 하도록 소스코드를 작성하였습니다.\*\*
  [ **파일명: index.js ]\*\*

       ...

       ...

       **app.listen(3000)**

  **해당 도커의 빌드를 완료하였고, 이미지 목록은 아래와 같습니다.**
  REPOSITORY TAG IMAGE ID CREATED SIZE
  <none> <none> 2e7a05ce7683 5 seconds ago 850MB
  **철수가 위 도커를 실행한 명령이 아래와 같을 때, 질문에 답하세요.**

  > docker run -p 3000:3000 2e7a05ce7683

1. 영희가 postman을 활용하여 철수가 만든 api에 요청을 보내려고 합니다.

   - 메소드: **GET**
   - 엔드포인트: **[http://localhost:2000/boards](http://localhost:3000/boards로)**

   이런... 요청이 실패했군요.

   엔드 포인트를 제대로 수정해 주세요.**(힌트: 포트가 잘못됨)**

   정답 > http://localhost:3000/boards

2. 영희의 고집이 너무 세서 위 1번의 요청을 반드시 보내야겠다고 합니다. 이에 따라, 철수가 실행 중인 도커를 중단하고 포트포워딩을 좀 수정해서 다시 도커를 실행해 주려고 합니다. 철수는 어떻게 도커를 실행해야 할까요?

   정답 > docker run -p 2000:3000 2e7a05ce7683

3. 위 2번에 이어서, 철수가 소스코드를 아래와 같이 수정했다면, 철수는 어떻게 도커를 실행해야 할까요?

   [ **파일명: index.js ]\*\*

   ...

   ...

   **app.listen(8000)**

   정답 > docker run -p 2000:8000 2e7a05ce7683

## 1-4) 도커 내부에 접속하기

- **아래와 같은 도커 프로세스 목록이 있습니다.**
  > docker ps
  > CONTAINER ID IMAGE COMMAND ...(이하 생략)
  > 2bd25dc4230a c40ac2cb72b3 "docker-entrypoint.s…” ...(이하 생략)

1. 해당 도커 내부에 접속하는 명령어는 무엇인가요?

   정답 > docker exec -it 2bd25dc4230a /bin/bash

2. vscode에서 `**index.js**`의 파일을 약간 수정하였습니다. 이때, 도커 내부의 파일도 수정이 될까요?

   정답 > 아니요.

3. vscode에서 **`yarn add`** 명령을 이용하여 특정 패키지를 하나 설치하였습니다. 이때, 도커 내부에도 패키지가 설치될까요?

   정답 > 아니요.

# 2. 도커 서술식 퀴즈

- **다음 두 도커 파일이 있습니다.**

  **[ 파일명: Dockerfile01 ]**

  **FROM** **node:14**

  **WORKDIR** **/my_backend/**

  **COPY** **. /my_backend/**

  **RUN** **yarn install**

  **CMD** **node index.js**

  =======================================

  **[ 파일명: Dockerfile02 ]**

  **FROM** **node:14**

  **WORKDIR** **/my_backend/**

  **COPY ./package.json /my_backend/**

  **COPY** **./yarn.lock /my_backend/**

  **RUN** **yarn install**

  **COPY** **. /my_backend/**

  **CMD** **node index.js**

1. 두 도커 파일의 차이점은 무엇인가요?

   정답 > yarn add로 라이브러리를 설치하는게 아닌 이상, 기존 build 내용이 cache에 저장되어 있어 소스 수정 이후 docker build 시간이 단축됨.
