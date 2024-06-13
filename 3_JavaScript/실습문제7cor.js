const images = document.querySelectorAll(".images img");
const span = document.querySelector("#click span");
const reset = document.querySelector("#restart");
let count = 0;

function clickHandler() {
  // 이미지들이 랜덤으로 계속 바뀌고 있음
  const random = [
    Math.floor(Math.random() * 3) + 1,
    Math.floor(Math.random() * 3) + 1,
    Math.floor(Math.random() * 3) + 1,
  ];
  for (let i = 0; i < images.length; i++) {
    images[i].setAttribute("src", `../resources/family${random[i]}.jpg`);
  }
  // 내가 클릭한 만큼 수가 증가
  span.innerHTML = ++count;
  // 조건 : 이미지 3개가 모두 일치할 때
  // ==> 아래 결과 텍스트가 나오면서 버튼 클릭 안되게 구현
  if (random[0] === random[1] && random[1] === random[2]) {
    result.innerHTML = "Congratulation!! Press restart to play again~!!";
    click.setAttribute("disabled", "disabled");
  }
}

function restartHandler() {
  //   이미지 처음에 셋팅했던 이미지로 변경
  for (let i = 0; i < images.length; i++) {
    images[i].setAttribute("src", `../resources/family${i + 1}.jpg`);
  }
  //   숫자는 다시 0으로 셋팅하고 span 태그 값 비우기
  count = 0;
  span.innerHTML = "";
  //   아래 텍스트도 값 비우기
  result.innerHTML = "";
  //   버튼의 disabled 삭제 -> 속성 삭제는 removeAttribute
  click.removeAttribute("disabled", "disabled");
}
click.addEventListener("click", clickHandler);
restart.addEventListener("click", restartHandler);
