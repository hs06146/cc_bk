function checkNumber(personalNumber) {
  const frontNumber = personalNumber.split("-")[0];
  const backNumber = personalNumber.split("-")[1];
  if (personalNumber.includes("-") === false) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  } else {
    if (frontNumber.length !== 6 || backNumber.length !== 7) {
      console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
      return false;
    } else {
      return true;
    }
  }
}

function registrationNumber(personalNumber) {
  return personalNumber.substring(0, personalNumber.length - 6) + "******";
}

function customRegistrationNumber(personalNumber) {
  // 1. 주민번호가 유효한 번호인지 확인
  const isValid = checkNumber(personalNumber);
  if (!isValid) {
    return;
  }
  // 2. 뒷 6자리를 *로 변환
  const number = registrationNumber(personalNumber);
  console.log(number);
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");
