const API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d";

$(function () {
  // 클릭했을때 geoFindMe를 실행하여 날씨 정보 가져오기
  $("#weatherButton").click(geoFindMe);

  // 모달 닫기 기능
  $(".close").click(function () {
    $(".modal").hide();
  });

  // 모달 외부 클릭 시 닫기
  $(window).click(function (event) {
    if ($(event.target).is(".modal")) {
      $(".modal").hide();
    }
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
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("날씨 예보 데이터:", data);

      const now = Math.floor(Date.now() / 1000);
      const closestWeather = data.list.reduce((prev, curr) => {
        return Math.abs(curr.dt - now) < Math.abs(prev.dt - now) ? curr : prev;
      });

      if (closestWeather) {
        const date = new Date(closestWeather.dt * 1000);
        const temp = Math.round(closestWeather.main.temp);
        const weather = closestWeather.weather[0].main;

        let weatherDescription;
        switch (weather) {
          case "Clear":
            weatherDescription = "맑음";
            break;
          case "Clouds":
            weatherDescription = "구름 많음";
            break;
          case "Rain":
            weatherDescription = "비";
            break;
          case "Snow":
            weatherDescription = "눈";
            break;
          case "Thunderstorm":
            weatherDescription = "뇌우";
            break;
          case "Mist":
            weatherDescription = "안개";
            break;
          default:
            weatherDescription = weather;
        }

        const formattedDate = date.toLocaleString();
        $("#data").text(`현재 시간: ${formattedDate}`);
        $("#temp").text(`온도: ${temp}°C`);
        $("#weather").text(`날씨: ${weatherDescription}`);

        // 모달
        $(".modal").show();
      } else {
        console.log("가장 가까운 3시간 단위의 날씨 데이터가 없습니다.");
      }
    });
}

function onGeoError() {
  alert("위치를 찾을 수 없습니다.");
}
