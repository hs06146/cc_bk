import { Token } from "./models/token.model.js";
import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

export async function checkPhoneIsAuthenticated(phone) {
  const result = await Token.findOne({ phone }).exec();
  if (result.isAuth === false || result === null) {
    return false;
  } else {
    return true;
  }
}

export function checkValidPhone(phone) {
  if (phone.length < 10 || phone.length > 11) {
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return token;
}

export function sendTokenToSMS(myphone, result) {
  // apiKey, apiSecret 설정
  const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET);
  messageService.sendOne({
    to: myphone,
    from: process.env.SMS_SENDER,
    text: `[Web 발신] 안녕하세요?! 요청하신 인증번호는 [${result}] 입니다.`,
  });

  console.log(`${myphone} 번호로 인증번호 [${result}] 를 전송하였습니다.`);
}
