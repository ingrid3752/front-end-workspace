// DOMContentLoaded : DOM 구조가 로드되고 실행!
// window.addEventListener("DOMContentLoaded", function () {}
const h1 = document.querySelector("h1");
h1.onmouseenter = function () {
  h1.style.backgroundColor = "purple";
};
h1.onmouseleave = function () {
  h1.style.backgroundColor = "pink";
};
// addEventListener만 기억하셔도 괜찮아요!
h1.addEventListener("click", function () {
  h1.style.backgroundColor = "skyblue";
});
// 이미지 클릭시 사라지는 이벤트 (querySelectorAll,addEventListener,for )
/*const img = document.querySelectorAll(".container img");
for (const i in img) {
    img[i].addEventListener("click", function (event) {
      img[i].style.display = "none";
    });
  }*/
const img = document.querySelectorAll(".container img");

/* 이미지마다 이벤트 걸려면 반복문 필요! */
/*
for (const i in img) {
  item.addEventListener("click", function (e) {
    e.currentTarget.style.display = "none";
  });
}
*/

const container = document.querySelector(".container");

function removeHandler(e) {
  if (e.target !== e.currentTarget) {
    e.target.style.display = "none";
  }
}

container.addEventListener("click", removeHandler);
