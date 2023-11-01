import axios from "axios";

// 비동기방식
function fetchAsync() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log(`비동기방식: ${result}`);
}

// 동기방식                     ===> 함수 중복 선언 문제를 피하지!!! (화살표 함수로 변경)
// async function fetchSync() {
//   const result = await axios.get("https://koreanjson.com/posts/1");
//   console.log(`동기방식: ${result}`);
//   console.log(`동기방식: ${result.data.title}`);
// }

const fetchSync = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  //     console.log(`동기방식: ${result}`);
  console.log(`동기방식: ${result.data.title}`);
};

fetchAsync();
fetchSync();
