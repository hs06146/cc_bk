import { getToday } from "./utils";

export function checkEmail(email) {
  if (email.includes("@") === false || email === undefined) {
    console.log("에러 발생!!! 이메일을 제대로 입력해 주세요!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school, createdAt }) {
  const mytemplate = `
            <html>
                <body>
                    <h1>철수님 가입을 환영합니다!!!</h1>
                    <hr />
                    <div>이름: ${name}</div>
                    <div>나이: ${age}살</div>
                    <div>학교: ${school}</div>
                    <div>가입일: ${getToday()}</div>
                </body>
            </html>
        `;
  return mytemplate;
}

export function sendTemplateToEmail({ email, template }) {
  console.log(`${email} 로 ${template}를 전송하였습니다.`);
}
