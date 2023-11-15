import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  checkPhoneIsAuthenticated,
  checkValidPhone,
  getToken,
  sendTokenToSMS,
} from "./token.js";
import { getOG } from "./cheerio.js";
import { User } from "./models/user.model.js";
import {
  sendTemplateToEmail,
  checkValidationEmail,
  getWelcomeTemplate,
} from "./email.js";
import { Token } from "./models/token.model.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;

  const isAuth = checkPhoneIsAuthenticated(phone);
  if (isAuth === false) {
    res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
    return;
  }

  const ogData = getOG(prefer);
  const pattern = /.{6}$/;

  const userData = new User({
    name,
    email,
    personal: personal.replace(pattern, "******"),
    prefer,
    pwd,
    phone,
    og: {
      title: ogData.title,
      description: ogData.description,
      image: ogData.image,
    },
  });

  const isValid = checkValidationEmail(email);
  if (isValid) {
    const mytemplate = getWelcomeTemplate(name);
    sendTemplateToEmail(email, mytemplate);
  }
  await userData.save();
  res.send(userData._id);
});

app.get("/users", async (req, res) => {
  const userData = await User.find({});
  res.send(userData);
});

app.post("/tokens/phone", async (req, res) => {
  const { phone } = req.body;

  const isValid = checkValidPhone(phone);
  if (isValid === false) {
    res.send("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return;
  }
  const token = getToken();
  sendTokenToSMS(phone, token);

  const userData = await Token.findOne({ phone });
  if (userData.phone === null) {
    const user = new Token({
      token,
      phone,
      isAuth: false,
    });
    await user.save();
  } else {
    await Token.updateOne({ phone }, { $set: { token } });
  }

  res.send("핸드폰으로 인증문자가 전송되었습니다.");
});

app.patch("/tokens/phone", async (req, res) => {
  const { phone, token } = req.body;
  const findPhone = await Token.findOne({ phone }).exec();
  if (findPhone === null) {
    return res.send("false");
  }
  if (findPhone.token === token) {
    await Token.updateOne({ phone }, { isAuth: "true" });
  }
  res.send("true");
});

mongoose
  .connect("mongodb://database:27017/mini-project")
  .then(() => {
    console.log("데이터베이스 연결 성공!");
  })
  .catch((err) => {
    console.log(err);
  });
console.log(`Server running at port 3000`);
app.listen(3000);
