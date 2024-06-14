/*
   사용자가 입력을 했을 때
   해당 조건이 틀릴 경우 빨간색으로 표시
              맞는 경우 초록색 표시와 함께 "OK!"
*/
const userId = document.querySelector("#userId");
const userIdSpan = document.querySelector("#userId+span");

userId.addEventListener("input", function () {
  // 첫글자는 반드시 영문자로, 그리고 영문자, 숫자 포함하여 총 4~12자로 입력하시오.
  const regExp = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
  const check = regExp.test(userId.value);
  if (check) {
    userIdSpan.stlye.color = "green";
    userIdSpan.innerHTML = "OK!";
  } else {
    userIdSpan.style.color = "red";
    userIdSpan.innerHTML =
      "첫글자는 반드시 영문자로, 그리고 영문자, 숫자 포함하여 총 4~12자로 입력하시오.";
  }
});
