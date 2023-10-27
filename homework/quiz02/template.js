function printTemplate({ name, email, personalNumber, phoneNumber, mySite }) {
  const result = `
        <html>
            <body>
            <h1>${name}님 가입을 환영합니다.</h1>
            <hr>
            <div>이메일: ${email}</div>
            <div>주민번호: ${personalNumber}</div>
            <div>휴대폰 번호: ${phoneNumber}</div>
            <div>내가 좋아하는 사이트: ${mySite}</div>
            </body>
        </html>
    `;

  console.log(result);
}

function registrationNumber(personalNumber) {
  return personalNumber.substring(0, personalNumber.length - 6) + "******";
}

const name = "철수";
const email = "email@example.com";
const personalNumber = registrationNumber("123456-1234567");
const phoneNumber = "01012345678";
const mySite = "apple.com";
printTemplate({ name, email, personalNumber, phoneNumber, mySite });
