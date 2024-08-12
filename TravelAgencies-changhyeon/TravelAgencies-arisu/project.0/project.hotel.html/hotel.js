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
  // dot 만들어주기!
  slider.forEach(() => {
    dotIndex += "<a href='#' class='dot'>이미지1</a>";
  });
  sliderDot.innerHTML = dotIndex;
  // 첫번째 닷에 활성화 표시
  sliderDot.firstChild.classList.add("active");
}
init();

// 이미지 이동
function gotoSlider(num) {
  sliderInner.style.transition = "all 400ms";
  sliderInner.style.transform = "translateX(" + -sliderWidth * num + "px)";
  currentIndex = num;
  const dotActive = document.querySelectorAll(".slider__dot .dot");
  // 두번째 이미지 ==> 두번째 닷 클래스 추가
  // 1. 닷 메뉴의 클래스 모두 삭제
  dotActive.forEach((el) => el.classList.remove("active"));
  // 2. 해당 이미지의 닷 메뉴 클래스 추가
  dotActive[num].classList.add("active");
}

// 버튼 클릭했을 때
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

// 닷 클릭했을 때 이미지 이동
document.querySelectorAll(".slider__dot .dot").forEach((dot, index) => {
  dot.addEventListener("click", () => {
    gotoSlider(index);
  });
});
