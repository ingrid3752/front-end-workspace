$(document).ready(function () {
  let currentIndex = 0;
  const slides = $(".slide");
  const totalSlides = slides.length;

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const newLeft = -currentIndex * 100 + "%";
    $(".slides-container").css("transform", `translateX(${newLeft})`);
  }
  // 마우스 포인터 위에올리면 멈추게 추가 , 클릭시 다음이미지로 넘어가기 추가
  setInterval(showNextSlide, 3000);
});
