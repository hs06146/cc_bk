// const express = require('express')
import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(bodyParser.json());
  ...
  // "/certifications"에 대한 POST 요청을 처리하는 controller
  app.post("/certifications", async (request, response) => {
    const { imp_uid } = request.body; // request의 body에서 imp_uid 추출
    try {
      // 인증 토큰 발급 받기
      const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        // POST method
        method: "post",
        // "Content-Type": "application/json"
        headers: { "Content-Type": "application/json" },
        data: {
          imp_key: "imp_apikey", // REST API키
          imp_secret: "ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f" // REST API Secret
        }
      });
      const { access_token } = getToken.data; // 인증 토큰
      ...
      // imp_uid로 인증 정보 조회
      const getCertifications = await axios({
        // imp_uid 전달
        url: \`https://api.iamport.kr/certifications/\${imp_uid}\`,
        // GET method
        method: "get",
        // 인증 토큰 Authorization header에 추가
        headers: { "Authorization": access_token }
      });
      const certificationsInfo = getCertifications.data; // 조회한 인증 정보
      ...
    } catch(e) {
      console.error(e);
    }
  });

app.listen(3000);

