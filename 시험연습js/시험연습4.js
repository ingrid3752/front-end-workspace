/*
사용자가 입력을 했을때 맞으면 green 틀리면 red
id부터 email까지 querySelector로 따오기
const (id) = document.querySelector ("#id")
id.addEventListener. ("input", function(e) {
const regExp = /^$/;
const check = regExp.test(id.value);

if (check) {
    idSpan.style.color = "green";
    idSpan.innerHTML = "OK!";
} else {
idSpan.style.color = "red" ;
idSpan.innerHTML = "spancopy"
}
    }
비밀번호 확인에는 if문 check 대신 (id.value === idCheck.value)
*/
const userId = document.querySelector("#userId");
const userIdSpan = document.querySelector("#userIdSpan");
const userPwd = document.querySelector("#userPwd");
const userPwdSpan = document.querySelector("#userPwdSpan");
const userPwdCheck = document.querySelector("#userPwdCheck");
const userPwdCheckSpan = document.querySelector("#userPwdCheckSpan");
const userName = document.querySelector("#userName");
const userNameSpan = document.querySelector("#userNameSpan");
const email = document.querySelector("#email");
const emailSpan = document.querySelector("#emailSpan");

// 아이디 = 첫 글자는 반드시 영문자로, 그리고 영문자, 숫자 포함하여 총 4~12자로 입력하시오.
userId.addEventListener("input", function (e) {
  const regExp = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
  const check = regExp.test(userId.value);

  if (check) {
    userIdSpan.style.color = "green";
    userIdSpan.innerHTML = "OK!";
  } else {
    userIdSpan.style.color = "red";
    userIdSpan.innerHTML =
      "첫 글자는 반드시 영문자로, 그리고 영문자, 숫자 포함하여 총 4~12자로 입력하시오.";
  }
});
// 비밀번호 = 영문자,숫자,특수문자 포함하여 총8~15자로 입력하시오.
userPwd.addEventListener("input", function (e) {
  const regExp = /^[!-~]{8,15}$/;
  const check = regExp.test(userPwd.value);

  if (check) {
    userPwdSpan.style.color = "green";
    userPwdSpan.innerHTML = "OK!";
  } else {
    userPwdSpan.style.color = "red";
    userPwdSpan.innerHTML =
      "영문자, 숫자, 특수문자 포함하여 총 8~15자로 입력하시오.";
  }
});
// 비밀번호 확인 = 위의 비밀번호와 일치하게 입력하시오.
userPwdCheck.addEventListener("input", function (e) {
  if (userPwd.value === userPwdCheck.value) {
    userPwdCheckSpan.style.color = "green";
    userPwdCheckSpan.innerHTML = "OK!";
  } else {
    userPwdCheckSpan.style.color = "red";
    userPwdCheckSpan.innerHTML = "위의 비밀번호와 일치하게 입력하시오.";
  }
});
// 이름 = 한글로만 이루어져야되며 2글자 이상으로 입력하시오.
userName.addEventListener("input", function (e) {
  const regExp = /^[가-힣]{2,}$/;
  const check = regExp.test(userName.value);

  if (check) {
    userNameSpan.style.color = "green";
    userNameSpan.innerHTML = "OK!";
  } else {
    userNameSpan.style.color = "red";
    userNameSpan.innerHTML =
      "한글로만 이루어져야되며 2글자 이상으로 입력하시오.";
  }
});
// 이메일 = 이메일 형식에 맞춰서 입력하시오.
email.addEventListener("input", function (e) {
  const regExp = /^[!-~]+@[!-~]+$/;
  const check = regExp.test(email.value);

  if (check) {
    emailSpan.style.color = "green";
    emailSpan.innerHTML = "OK!";
  } else {
    emailSpan.style.color = "red";
    emailSpan.innerHTML = "이메일 형식에 맞춰서 입력하시오";
  }
});
