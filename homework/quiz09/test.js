function checkPhone(phoneNumber) {
  if (phoneNumber.includes("-")) {
    phoneNumber = phoneNumber.replace(/-/g, "");
  }
  if (phoneNumber.length < 10 || phoneNumber.length > 11) {
    console.log("false");
    return false;
  } else {
    console.log("true");
    return true;
  }
}

function getToken() {
  const token = String(Math.floor(Math.random() * 1000000)).padStart("6", "0");
  return token;
}
getToken();
