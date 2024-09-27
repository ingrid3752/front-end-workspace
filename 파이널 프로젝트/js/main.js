const btn = document.getElementById("modal_button"); // 모달 띄우는 버튼
const modal = document.getElementById("modal"); //
const closeBtn = document.getElementById("close_btn");

btn.onclick = function () {
  modal.classList.add("open");
};

closeBtn.onclick = function () {
  modal.classList.remove("open");
};
