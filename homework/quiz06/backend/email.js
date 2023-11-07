import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export function checkEmail(email) {
  if (email.includes("@") === false || email === undefined) {
    console.log("에러 발생!!! 이메일을 제대로 입력해 주세요!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, phoneNum, prefer }) {
  const mytemplate = `
            <html>
                <body>
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 500px;">
                      <h1>${name}님 가입을 환영합니다!!!</h1>
                      <hr />
                      <div">이름: ${name}</div>
                      <div>전화번호: ${phoneNum}</div>
                      <div>좋아하는 사이트: ${prefer}</div>
                      <div style="color: red;">가입일: ${getToday()}</div>
                      </div>
                    </div>
                </body>
            </html>
        `;
  return mytemplate;
}

export async function sendTemplateToEmail({ email, template }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const res = await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "[TEST] 가입을 축하합니다!!",
    html: template,
  });
  console.log(res);
  // console.log(`${email} 로 ${template}를 전송하였습니다.`);
}
