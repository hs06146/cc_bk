// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const third = document.getElementById("PhoneNumber03").value;
  const myphone = first + second + third;
  console.log(myphone);
  axios.post("http://localhost:3000/tokens/phone", {
    myphone,
  });
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  console.log("인증 번호 전송");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const personal = document.getElementById("SignupPersonal").value;
  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const third = document.getElementById("PhoneNumber03").value;
  const myphone = first + second + third;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const password = document.getElementById("SignupPwd").value;

  console.log(`name: ${name},
    personal: ${personal},
    myphone: ${myphone},
    prefer: ${prefer},
    email: ${email},
    password: ${password}
  `);

  axios.post("http://localhost:3000/users", {
    name,
    personal,
    phoneNum: myphone,
    prefer,
    email,
    password,
  });
  console.log("회원 가입 이메일 전송");
};
