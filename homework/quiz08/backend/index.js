import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/users", (req, res) => {
  const users = [
    {
      email: "aaa@aaa.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "Nick@nick.com",
      name: "Nick",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Judy@judy.com",
      name: "Judy",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Anna@anna.com",
      name: "Anna",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Elsa@elsa.com",
      name: "Elsa",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
  ];

  res.send(users);
});

app.get("/starbucks", (req, res) => {
  const menu = [
    {
      name: "아메리카노",
      kcal: 5,
    },
    {
      name: "카페라떼",
      kcal: 10,
    },
    {
      name: "콜드브루",
      kcal: 15,
    },
    {
      name: "카페모카",
      kcal: 50,
    },
    {
      name: "돌체라떼",
      kcal: 500,
    },
    {
      name: "카라멜라떼",
      kcal: 200,
    },
    {
      name: "바닐라라떼",
      kcal: 20,
    },
    {
      name: "에스프레소",
      kcal: 1,
    },
    {
      name: "디카페인",
      kcal: 5,
    },
    {
      name: "오트라떼",
      kcal: 300,
    },
  ];

  res.send(menu);
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
  const { name, personal, phoneNum, prefer, email, password } = req.body;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-'@'포함여부)
  const isValidEmail = checkEmail(email);
  if (isValidEmail === false) return;
  // 2. 가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, phoneNum, prefer });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail({ email, template });
  res.send("가입완료!!");
});

mongoose
  .connect("mongodb://my-database:27017/quiz07")
  .then(() => {
    console.log("DB연결 성공!!");
  })
  .catch(() => {
    console.log("DB연결 실패!!");
  });
app.listen(3000);
