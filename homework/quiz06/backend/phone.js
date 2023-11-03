import coolsms from "coolsms-node-sdk";

const mysms = coolsms.default;

export function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
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
