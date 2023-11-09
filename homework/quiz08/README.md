# 1. Docker 패키징 및 MongoDB연결

<aside>
📁 과제 생성 위치:

`homework/Quiz06` 위치의 `backend`, `frontend`
총 2개의 폴더를 복사해 `homework/Quiz08` 폴더 안에 붙여넣기 해주세요.

</aside>

1. `backend` 폴더에 `Dockerfile`, `.dockerignore`, `docker-compose.yaml` 총 3개의 파일을 만들어 주세요.
   1. 도커를 사용해 node와 mongoDB 서버를 만들어주세요.
   2. mongodb의 버전은 image를 이용해 정의해 주세요.
2. Mongoose를 이용해 Node.js와 MongoDB를 연결해 주세요.
   1. 연결은 `index.js` 파일에서 진행해 주세요.
3. docker를 이용해 서버를 띄우고 서버가 정상적으로 연결되는지 확인해 주세요.
4. MongoDB-compass에서도 정상적으로 연결되는지 확인해 주세요.
