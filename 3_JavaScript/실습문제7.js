/* 1. click을 눌렀을때 이미지가 랜덤변화
   2. click 안의 span의 숫자도 횟수따라올라감
   3. 이미지 3개가 일치할때 result출력
   4. restart를 눌렀을때 맨처음 상태로 돌아옴(새로고침) */
function clickHandler() {
  alert("click!");
}

function restartHandler() {
  alert("restart!");
}
click.addEventListener("click", clickHandler);
restart.addEventListener("click", restartHandler);
