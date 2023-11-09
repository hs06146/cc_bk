import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import { Token } from "./models/token.model.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;

  // 휴대폰 검증
  const isValid = checkPhone(phone);
  if (isValid === false) {
    return;
  }
  const token = getToken();
  const existUser = await Token.findOne({ phone }).exec();
  if (existUser === null) {
    const userinfo = new Token({
      token,
      phone,
      isAuth: false,
    });
    await userinfo.save();
  } else {
    await Token.updateOne({ phone }, { token })
      .then(() => {
        console.log("업데이트에 성공하였습니다!");
      })
      .catch(() => {
        console.log("업데이트에 실패하였습니다!");
      });
  }
  sendTokenToSMS(phone, token);
  // 응답
  res.send(`${phone}으로 인증 문자가 전송되었습니다.`);
});

app.patch("/tokens/phone", async (req, res) => {
  const { phone, token } = req.body;

  const existPhone = await Token.findOne({ phone }).exec();
  if (existPhone === null) {
    res.send(false);
    return;
  }

  if (token !== existPhone.token) {
    res.send(false);
    return;
  }

  await Token.updateOne({ phone }, { isAuth: true });
  res.send(true);
});

mongoose
  .connect("mongodb://my-database:27017/quiz09")
  .then(() => {
    console.log("DB 연결 성공!");
  })
  .catch(() => {
    console.log("DB 연결 실패!");
  });
app.listen(3000);
