function printNowDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  console.log(
    `오늘은 ${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second} 입니다.`
  );
}
printNowDate();
