const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = document.querySelector(".slider__img"); // 보여지는 영역
const sliderInner = document.querySelector(".slider__inner"); // 움직이는 영역
const slider = document.querySelectorAll(".slider"); // 개별적 이미지
const sliderDot = document.querySelector(".slider__dot"); // dot

let currentIndex = 0; // 현재 이미지
let sliderCount = slider.length; // 이미지 개수
let sliderWidth = sliderImg.offsetWidth; // 이미지 가로값
let dotIndex = "";
function init() {
  slider.forEach(() => {
    dotIndex += "<a href='#' class='dot'>이미지1</a>";
  });
  sliderDot.innerHTML = dotIndex;
  sliderDot.firstChild.classList.add("active");
}
init();

function gotoSlider(num) {
  sliderInner.style.transition = "all 400ms";
  sliderInner.style.transform = "translateX(" + -sliderWidth * num + "px)";
  currentIndex = num;

  const dotActive = document.querySelectorAll(".slider__dot .dot");
  dotActive.forEach((el) => el.classList.remove("active"));
  dotActive[num].classList.add("active");
}

document.querySelectorAll(".slider__btn a").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    let prevIndex = (currentIndex + (sliderCount - 1)) % sliderCount;
    let nextIndex = (currentIndex + 1) % sliderCount;

    if (btn.classList.contains("prev")) {
      gotoSlider(prevIndex);
    } else {
      gotoSlider(nextIndex);
    }
  });
});
document.querySelectorAll(".slider__dot .dot").forEach((dot, index) => {
  dot.addEventListener("click", () => {
    gotoSlider(index);
  });
});
