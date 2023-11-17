import { Token } from "../../models/token.model.js";
import coolsms from "coolsms-node-sdk";

export class TokenService {
  phone;
  //result;
  constructor(phone) {
    this.phone = phone;
    //this.result = result;
  }

  checkPhoneIsAuthenticated = async () => {
    const result = await Token.findOne({ phone: this.phone }).exec();
    console.log(result);
    if (result.isAuth === false || result.isAuth === null) {
      return false;
    } else {
      return true;
    }
  };

  checkValidPhone = () => {
    if (this.phone.length < 10 || this.phone.length > 11) {
      return false;
    } else {
      return true;
    }
  };

  getToken = () => {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    return token;
  };

  sendTokenToSMS = () => {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    // apiKey, apiSecret 설정
    const mysms = coolsms.default;
    const messageService = new mysms(
      process.env.SMS_KEY,
      process.env.SMS_SECRET
    );
    messageService.sendOne({
      to: this.phone,
      from: process.env.SMS_SENDER,
      text: `[Web 발신] 안녕하세요?! 요청하신 인증번호는 [${this.result}] 입니다.`,
    });

    console.log(`${this.phone} 번호로 인증번호 [${token}] 를 전송하였습니다.`);
  };
}
