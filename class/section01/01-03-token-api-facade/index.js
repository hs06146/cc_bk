function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

function sendTokenToSMS(myphone, result) {
  console.log(`${myphone} 번호로 인증번호 ${result}를 전송하였습니다.`);
}

function createTokenOfPhone(myphone) {
  const isValid = checkPhone(myphone);
  if (isValid === false) {
    return;
  }
  const mytoken = getToken();
  sendTokenToSMS(myphone, mytoken);
}

createTokenOfPhone("01012345678");
