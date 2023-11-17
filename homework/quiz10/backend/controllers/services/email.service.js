// import { getToday } from "./utils.js";
import { UtilService } from "./util.service.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export class EmailService {
  email;
  name;
  constructor(email, name) {
    this.email = email;
    this.name = name;
  }

  checkValidationEmail = () => {
    if (this.email == undefined || !this.email.includes("@")) {
      console.log("이메일을 입력해주세요.");
      return false;
    } else {
      return true;
    }
  };

  getWelcomeTemplate = () => {
    const utilService = new UtilService();
    return `
          <html>
              <body>
                <div style="display: flex; flex-direction:column; align-items:center;">
                  <div style="width: 500px;">
                      <h1 style="color: red;">${
                        this.name
                      }님 가입을 환영합니다.</h1>
                      <hr />
                      <div>이름: ${this.name}</div>
                      <div>가입일: ${utilService.getToday()}</div>
                  </div>
                </div>
              </body>
          </html>
          `;
  };

  sendTemplateToEmail = async () => {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_SENDER = process.env.EMAIL_SENDER;
    const template = this.getWelcomeTemplate();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    result = await transporter.sendMail({
      from: EMAIL_SENDER,
      to: this.email,
      subject: "[Dev] 가입 축하",
      html: template,
    });
  };
}
