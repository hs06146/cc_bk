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
  console.log(mytemplate);
}

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";
const createdAt = "2023-10-23";

getWelcomeTemplate({ name, age, school, createdAt });
