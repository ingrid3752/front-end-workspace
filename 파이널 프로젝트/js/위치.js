function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `위도: ${latitude} °, 경도: ${longitude} ° `;
  }

  function error() {
    status.textContent = "현재 위치를 가져올 수 없음";
  }

  if (!navigator.geolocation) {
    status.textContent = "브라우저가 위치 정보를 지원하지 않음";
  } else {
    status.textContent = "위치 파악 중…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

//464ce89f05d310c3ebcdad8c20e4af4d
const API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d";

$(function () {
  // Geolocation API에 액세스할 수 있는지를 확인
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  } else {
    alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
  }
  // 위치 감시 시작
  var id = navigator.geolocation.watchPosition(function (pos) {
    $("#latitude").html(pos.coords.latitude); // 위도
    $("#longitude").html(pos.coords.longitude); // 경도
  });
  // 버튼 클릭으로 감시를 중지
  $("#btnStop").click(function () {
    navigator.geolocation.clearWatch(id);
  });
});

function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const now = new Date();
      const formattedDate = now.toLocaleString();
      const temp = Math.round(data.main.temp);
      const weather = data.weather[0].main;
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
        $("#data").text(`${formattedDate}`);
        $("#temp").text(`${temp}°C`);
        $("#weather").text(`${weatherDescription}`);

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

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
