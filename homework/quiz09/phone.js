import coolsms from "coolsms-node-sdk";
import dotenv from "dotenv";

const mysms = coolsms.default;
dotenv.config();

export function checkPhone(phone) {
  if (phone.includes("-")) {
    phone = phone.replace(/-/g, "");
  }
  if (phone.length < 10 || phone.length > 11) {
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart("6", "0");
  return token;
}

export function sendTokenToSMS(phone, token) {
  const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET);

  // 2건 이상의 메시지를 발송할 때는 sendMany, 단일 건 메시지 발송은 sendOne을 이용해야 합니다.
  messageService
    .sendOne({
      to: phone,
      from: process.env.SMS_SENDER,
      text: `[Web 발신] 요청하신 인증번호는 ${token}입니다.`,
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
