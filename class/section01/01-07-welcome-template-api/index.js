function checkEmail(email) {
  if (email.includes("@") === false || email === undefined) {
    console.log("에러 발생!!! 이메일을 제대로 입력해 주세요!!");
    return false;
  } else {
    return true;
  }
}

function getWelcomeTemplate({ name, age, school, createdAt }) {
  const mytemplate = `
          <html>
              <body>
                  <h1>철수님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>나이: ${age}살</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${createdAt}</div>
              </body>
          </html>
      `;
  return mytemplate;
}

function sendTemplateToEmail({ email, template }) {
  console.log(`${email} 로 ${template}를 전송하였습니다.`);
}

function createUser({ name, age, school, email, createdAt }) {
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-'@'포함여부)
  const isValidEmail = checkEmail(email);
  if (isValidEmail === false) return;
  // 2. 가입환영 템플릿 만들기
  const template = getWelcomeTemplate({ name, age, school, createdAt });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail({ email, template });
}

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const nowDate = `${year}-${month}-${day}`;
  return nowDate;
}

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "a@a.com";
const createdAt = getToday();
createUser({ name, age, school, email, createdAt });
