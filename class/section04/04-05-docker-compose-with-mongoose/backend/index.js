// const express = require('express')
import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get("/boards", function (req, res) {
  // 1. Database 접속 후 데이터를 조회 ==> 데이터를 조회했다고 가정
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목입니다~~",
      contents: "내용이에요",
    },
    {
      number: 2,
      writer: "영희",
      title: "영희입니다~~",
      contents: "영희예요",
    },
    {
      number: 3,
      writer: "훈이",
      title: "훈이입니다~~",
      contents: "훈이예요",
    },
  ];
  // 2. Database에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("=========================================================");
  console.log(req.body);

  // 2. DB에 접속 후, 데이터를 저장 ==> 데이터를 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답으로 주기
  res.send("게시물 등록에 성공하였습니다.");
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.myphone;
  const isValid = checkPhone(myphone);
  if (isValid === false) {
    return;
  }
  const mytoken = getToken();
  sendTokenToSMS(myphone, mytoken);

  res.send("인증완료");
});

app.post("/users", (req, res) => {
  const { name, age, school, email } = req.body;

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-'@'포함여부)
  const isValidEmail = checkEmail(email);
  if (isValidEmail === false) return;
  // 2. 가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail({ email, template });
  res.send("가입완료!!");
});

mongoose
  .connect("mongodb://my-database:27017/mydocker") // name resolution
  .then(() => {
    console.log("DB 접속에 성공하였습니다!!");
  })
  .catch(() => {
    console.log("DB 접속에 실패하였습니다!!");
  });
app.listen(4000);
