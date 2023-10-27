// 구조분해할당 예제
const profile = {
  name: "철수",
  age: 12,
  school: "다람쥐초등학교",
};

const { name, age, school } = profile;
console.log(name, age, school);

// 1. 일반 변수 전달하기
function zzz(aaa) {
  // const aaa = "사과"
  console.log(aaa); // 사과
}
zzz("사과");

// 2. 객체 전달하기
function qqq(aaa) {
  // const aaa = basket
  console.log(aaa);
  console.log(aaa.apple);
  console.log(aaa.banana);
}
const basket = {
  apple: 3,
  banana: 10,
};
qqq(basket);

// 3. 객체 전달하기 => 구조분해할당 방식으로 전달하기
function ppp({ apple, banana }) {
  console.log(apple);
  console.log(banana);
}
const basket1 = {
  apple: 3,
  banana: 10,
};
ppp(basket1);
