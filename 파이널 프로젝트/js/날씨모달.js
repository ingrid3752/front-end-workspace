const API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d";
$(function () {
  $("#weatherButton").click(geoFindMe);
  $(".close").click(function () {
    $(".modal").hide();
  });
  $(window).click(function (event) {
    if ($(event.target).is(".modal")) {
      $(".modal").hide();
    }
  });
  // 모달 이동 관련 변수
  let isDragging = false;
  let offset = { x: 0, y: 0 };
  // 모달을 드래그할 수 있게 설정
  $(".modal-content").mousedown(function (e) {
    isDragging = true;
    offset.x = e.clientX - $(this).offset().left;
    offset.y = e.clientY - $(this).offset().top;
    $(document).mousemove(function (e) {
      if (isDragging) {
        $(".modal-content").css({
          left: e.clientX - offset.x,
          top: e.clientY - offset.y,
          position: "absolute", // position을 absolute로 설정
        });
      }
    });
  });
  $(document).mouseup(function () {
    isDragging = false;
    $(document).off("mousemove"); // 드래그 종료 시 mousemove 이벤트 해제
  });
});
function geoFindMe() {
  if (!navigator.geolocation) {
    alert("브라우저가 위치 정보를 지원하지 않습니다.");
    return;
  }
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("현재 날씨 데이터:", data);
      const now = new Date();
      const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
      const dateParts = now.toLocaleDateString("ko-KR", dateOptions).split(".");
      const formattedDate = `${
        dateParts[0]
      }년 ${dateParts[1].trim()}월 ${dateParts[2].trim()}일`;
      const formattedTime = now.toLocaleTimeString("ko-KR", timeOptions);
      const temp = Math.round(data.main.temp);
      const weather = data.weather[0].main;
      // 아이콘 설정
      const icon = data.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      $(".icon").attr("src", iconURL); // 아이콘 이미지 업데이트
      let weatherDescription;
      let modalClass;
      switch (weather) {
        case "Clear":
          weatherDescription = "맑음";
          modalClass = "clear";
          break;
        case "Clouds":
          weatherDescription = "구름 많음";
          modalClass = "clouds";
          break;
        case "Rain":
          weatherDescription = "비";
          modalClass = "rain";
          break;
        case "Snow":
          weatherDescription = "눈";
          modalClass = "snow";
          break;
        case "Thunderstorm":
          weatherDescription = "뇌우";
          modalClass = "thunderstorm";
          break;
        case "Mist":
          weatherDescription = "안개";
          modalClass = "mist";
          break;
        default:
          weatherDescription = weather;
          modalClass = "";
      }
      // 모달 클래스 변경
      $(".modal-content").attr("class", "modal-content " + modalClass);
      $("#data").text(`${formattedDate} ${formattedTime}`);
      $("#temp").text(`${temp}°C`);
      $("#weather").text(`${weatherDescription}`);
      // 모달 표시
      $(".modal").show();
    });
}
function onGeoError() {
  alert("위치를 찾을 수 없습니다.");
}
