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

function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // console.log(`You live in ${latitude} and ${longitude}`);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) =>
      console.log(`온도 : ${data.main.temp}, 날씨 : ${data.weather[0].main}`)
    );
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function onGeoOk(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("날씨 예보 데이터:", data);

      // 현재 시간을 밀리초로 가져오고, 초 단위로 변환
      const now = Math.floor(Date.now() / 1000);

      // 가장 가까운 3시간 단위 날씨 데이터 찾기
      const closestWeather = data.list.reduce((prev, curr) => {
        return Math.abs(curr.dt - now) < Math.abs(prev.dt - now) ? curr : prev;
      });

      // 날씨 데이터를 화면에 출력
      if (closestWeather) {
        const date = new Date(closestWeather.dt * 1000);
        const temp = Math.round(closestWeather.main.temp);
        const weather = closestWeather.weather[0].main;

        // 날씨 상태를 한국어로 변환
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
        document.getElementById("data").textContent = ` ${formattedDate}`;
        document.getElementById(
          "temp"
        ).textContent = ` ${temp.toLocaleString()} °C`;
        document.getElementById(
          "weather"
        ).textContent = ` ${weatherDescription}`; // 날씨 상태
        console.log(
          `날짜: ${formattedDate}, 온도: ${temp}°C, 날씨: ${weatherDescription}`
        );
      } else {
        console.log("가장 가까운 3시간 단위의 날씨 데이터가 없습니다.");
      }
    });
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
