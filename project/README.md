<!--

## 날씨

1. weather.js(날씨모달화면)를 import해와서 App.js(메인화면)에 같이 띄우기
2. main.html,css,js를 리액트 방식으로 변환
3. 각 js에서 구현하여 App.js에 import하는 방식으로 한다?



-->
<!--
카카오 API 위치받기
 WeatherModal2


import React, { useState, useEffect } from "react";
import axios from "axios";

const WEATHER_API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d";
const KAKAO_API_KEY = "5e8cee045b9aba2d94e7c7917da371e0";

const Weather = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({
    left: "50%",
    top: "50%",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchLocation = async () => {
        if (latitude && longitude) {
          try {
            const response = await fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, // URL 수정
              {
                headers: {
                  Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
              }
            );
            const data = await response.json();
            console.log("Kakao API response:", data);
            if (data.documents && data.documents.length > 0) {
              setLocation(data.documents[0].region_1depth_name);
            }
          } catch (error) {
            setError("Failed to fetch location data");
          }
        }
      };
      fetchLocation();
    }
  }, [latitude, longitude]);

  const geoFindMe = () => {
    if (!navigator.geolocation) {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric` // URL 수정
          );
          const formattedWeatherData = formatWeatherData(weatherResponse.data);
          setWeatherData(formattedWeatherData);

          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric` // URL 수정
          );
          const filteredForecast = forecastResponse.data.list.filter(
            (_, index) => index % 8 === 0
          );
          setForecast(filteredForecast);
        } catch (error) {
          setError("Failed to fetch weather data");
          console.error(error);
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  const onGeoOk = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric` // URL 수정
      );
      setWeatherData(formatWeatherData(response.data));
      setModalVisible(true); // 모달 열기
    } catch (error) {
      console.error("날씨 정보를 가져오는 중 오류 발생:", error);
    }
  };

  const formatWeatherData = (data) => {
    const now = new Date();
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    const dateParts = now.toLocaleDateString("ko-KR", dateOptions).split(".");
    const formattedDate = `${
      dateParts[0]
    }년 ${dateParts[1].trim()}월 ${dateParts[2].trim()}일`;
    const formattedTime = now
      .toLocaleTimeString("ko-KR", timeOptions)
      .replace("오후", "오후 ")
      .replace("오전", "오전 ");

    const temp = Math.round(data.main.temp);
    const weatherDescription = translateWeather(data.weather[0].main);
    const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    return {
      formattedDate,
      formattedTime,
      temp,
      weatherDescription,
      iconURL,
      modalClass: data.weather[0].main.toLowerCase(),
    };
  };

  const translateWeather = (weather) => {
    switch (weather) {
      case "Clear":
        return "맑음";
      case "Clear Sky":
        return "맑음";
      case "broken clouds":
        return "구름 많음";
      case "Clouds":
        return "구름 많음";
      case "Rain":
        return "비";
      case "Snow":
        return "눈";
      case "Thunderstorm":
        return "뇌우";
      case "Mist":
        return "안개";
      default:
        return weather;
    }
  };

  const onGeoError = () => {
    alert("위치를 찾을 수 없습니다.");
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    });
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({
        left: `${e.clientX - offset.x}px`,
        top: `${e.clientY - offset.y}px`,
      });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setWeatherData(null);
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}

      {modalVisible && (
        <div
          className="modal"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className={`modal-content ${weatherData.modalClass}`}
            style={{
              left: modalPosition.left,
              top: modalPosition.top,
              position: "absolute",
            }}
            onMouseDown={handleMouseDown}
          >
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>날씨 정보</h2>
            {weatherData && (
              <div className="weather-info">
                <p>도시: {location ? location : "위치 정보 없음"}</p>
                <p id="data">
                  {weatherData.formattedDate} {weatherData.formattedTime}
                </p>
                <p id="temp">{weatherData.temp}°C</p>
                <p id="weather">{weatherData.weatherDescription}</p>
                <h1>날씨 예보</h1>
                {forecast.length > 0 ? (
                  <div className="forecast">
                    {forecast.map((day) => (
                      <div key={day.dt} className="forecast-item">
                        <h3>{new Date(day.dt_txt).toLocaleDateString()}</h3>
                        <p>온도: {Math.round(day.main.temp)}°C</p>
                        <p>날씨: {translateWeather(day.weather[0].main)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Fetching forecast data...</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

 -->
<!--
카카오 API 제외 구현
import React, { useState, useEffect } from "react";
import axios from "axios";
import memoIcon from "../img/메모장.png";
import photoIcon from "../img/사진.png";
import stockIcon from "../img/주식.png";
import calendarIcon from "../img/캘린더.png";
import weatherIcon from "../img/날씨.png";
import trashIcon from "../img/휴지통.png";
import calIcon from "../img/계산기.png";
import { TbReload } from "react-icons/tb";
import "./assets/weatherModal.css";
import "./assets/main.css";

const App = () => {
  const API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d";

  const [modalVisible, setModalVisible] = useState(false);
  const [weatherData, setWeatherData] = useState({
    date: "",
    temp: "",
    description: "",
    modalClass: "",
  });

  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleWeatherButtonClick = () => {
    geoFindMe();
  };

  const geoFindMe = () => {
    if (!navigator.geolocation) {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  };

  const onGeoOk = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const isRainyWeather = (description) => {
      const rainyConditions = [
        "rain",
        "moderate rain",
        "heavy rain",
        "light rain",
        "shower rain",
        "thunderstorm",
      ];
      return rainyConditions.some((condition) =>
        description.includes(condition)
      );
    };

    const getWeatherDescription = (description) => {
      if (description.includes("clear")) return "맑음";
      if (isRainyWeather(description)) return "비";
      if (description.includes("clouds")) return "구름 많음";
      if (description.includes("snow")) return "눈";
      if (description.includes("thunderstorm")) return "뇌우";
      if (description.includes("mist")) return "안개";
      return "기타";
    };

    // 요일
    const getDayOfWeek = (date) => {
      const days = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      return days[date.getDay()];
    };

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const data = response.data;

      const now = new Date();
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
      const formattedDate = `${
        now.getMonth() + 1
      }월 ${now.getDate()}일 ${now.toLocaleTimeString("ko-KR", timeOptions)}`;

      const currentTemp = Math.round(data.list[0].main.temp);
      const currentDescription = data.list[0].weather[0].description;

      const todayDate = now.toISOString().split("T")[0];
      let maxTempToday = -Infinity;
      let minTempToday = Infinity;

      data.list.forEach((entry) => {
        const entryDate = entry.dt_txt.split(" ")[0];
        if (entryDate === todayDate) {
          const temp = entry.main.temp;
          maxTempToday = Math.max(maxTempToday, temp);
          minTempToday = Math.min(minTempToday, temp);
        }
      });

      // 내일 날짜 및 기온 데이터
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDateString = tomorrow.toISOString().split("T")[0];
      const formattedTomorrowDate = `${
        tomorrow.getMonth() + 1
      }월 ${tomorrow.getDate()}일 ${getDayOfWeek(tomorrow)}`;

      let maxTempTomorrow = -Infinity;
      let minTempTomorrow = Infinity;

      data.list.forEach((entry) => {
        const entryDate = entry.dt_txt.split(" ")[0];
        if (entryDate === tomorrowDateString) {
          const temp = entry.main.temp;
          maxTempTomorrow = Math.max(maxTempTomorrow, temp);
          minTempTomorrow = Math.min(minTempTomorrow, temp);
        }
      });

      // +2일, +3일, +4일 기온 데이터
      const daysAhead = [2, 3, 4];
      const futureWeather = daysAhead.map((days) => {
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + days);
        const futureDateString = futureDate.toISOString().split("T")[0];

        let maxTempFuture = -Infinity;
        let minTempFuture = Infinity;

        data.list.forEach((entry) => {
          const entryDate = entry.dt_txt.split(" ")[0];
          if (entryDate === futureDateString) {
            const temp = entry.main.temp;
            maxTempFuture = Math.max(maxTempFuture, temp);
            minTempFuture = Math.min(minTempFuture, temp);
          }
        });

        return {
          formattedDate: `${
            futureDate.getMonth() + 1
          }월 ${futureDate.getDate()}일 ${getDayOfWeek(futureDate)}`,
          maxTemp:
            maxTempFuture !== -Infinity
              ? `${Math.round(maxTempFuture)}°`
              : "데이터 없음",
          minTemp:
            minTempFuture !== Infinity
              ? `${Math.round(minTempFuture)}°`
              : "데이터 없음",
        };
      });

      const modalClass = isRainyWeather(currentDescription) ? "rain" : "clear";

      setWeatherData({
        date: formattedDate,
        temp: `${currentTemp}°`,
        description: getWeatherDescription(currentDescription),
        maxTemp: `${Math.round(maxTempTomorrow)}°`, // 내일 최고 기온
        minTemp: `${Math.round(minTempTomorrow)}°`, // 내일 최저 기온
        todayMaxTemp:
          maxTempToday !== -Infinity
            ? `${Math.round(maxTempToday)}°`
            : "데이터 없음",
        todayMinTemp:
          minTempToday !== Infinity
            ? `${Math.round(minTempToday)}°`
            : "데이터 없음",
        tomorrowDate: formattedTomorrowDate,
        futureWeather, // 예보된 날씨 정보 추가
        modalClass,
      });

      setModalVisible(true);
    } catch (error) {
      console.error("날씨 정보를 가져오는 중 오류 발생:", error);
    }
  };
  const onGeoError = () => {
    alert("위치를 찾을 수 없습니다.");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleRefresh = () => {
    geoFindMe(); // 새로고침
  };

  // 드래그
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="main">
      <div className="main2"></div>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.021)" }}>
        <div
          className="bottom"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.363)" }}
        >
          <div className="icon">
            <button className="btn-open-modal">
              <img src={memoIcon} alt="메모장" />
            </button>
          </div>
          <div className="icon">
            <a href="">
              <img src={photoIcon} alt="사진" />
            </a>
          </div>
          <div className="icon">
            <a href="">
              <img src={stockIcon} alt="주식" />
            </a>
          </div>
          <div className="icon">
            <a href="">
              <img src={calendarIcon} alt="달력" />
            </a>
          </div>
          <div className="icon">
            <button id="weatherButton" onClick={handleWeatherButtonClick}>
              <img src={weatherIcon} alt="날씨" />
            </button>
          </div>
          <div className="icon">
            <a href="">
              <img src={calIcon} alt="계산기" />
            </a>
          </div>
          <div className="icon">
            <a href="">
              <img src={trashIcon} alt="휴지통" />
            </a>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal">
          <div
            className={`modal-content ${weatherData.modalClass}`}
            style={{ left: modalPosition.x, top: modalPosition.y }}
            onMouseDown={handleMouseDown}
          >
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <button className="refresh" onClick={handleRefresh}>
              <TbReload size="20" color="#fff" />
            </button>
            <div className="weather-info">
              <p id="date">{weatherData.date}</p>
              <p id="temp">{weatherData.temp}</p>
              <p id="weather">{weatherData.description}</p>
              <p id="today">
                최고: {weatherData.todayMaxTemp} 최저:{" "}
                {weatherData.todayMinTemp}
              </p>

              <h3>{weatherData.tomorrowDate}</h3>
              <p id="tomorrow">
                최고: {weatherData.maxTemp} 최저: {weatherData.minTemp}
              </p>

              {weatherData.futureWeather.map((weather, index) => (
                <div key={index}>
                  <h3>{weather.formattedDate}</h3>
                  <p>
                    최고: {weather.maxTemp} 최저: {weather.minTemp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

 -->
<!--
날씨모달 css
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0);
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: absolute;
  padding: 20px;
  border: 1px solid #888;
  width: auto;
  height: auto;
  font-size: large;
  color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.weather-info {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-top: 10px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.weather-info p {
  margin: 5px 0;
}

.weather-info h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
}

.close {
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.clear {
  background-image: url("../img/맑음.jpg");
}

.clouds {
  background-image: url("../img/구름많음.jpg");
}

.rain {
  background-image: url("../img/비.jpg");
}

.snow {
  background-image: url("../img/눈.jpg");
}

.thunderstorm {
  background-image: url("../img/뇌우.jpg");
}

.mist {
  background-image: url("../img/안개.jpg");
}

.modal-content.clear,
.modal-content.clouds,
.modal-content.rain,
.modal-content.snow,
.modal-content.thunderstorm,
.modal-content.mist {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.363);
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
}

#temp {
  font-size: 3em;
  font-weight: bold;
}

 -->

 <!-- 
 import React, { useEffect, useState } from 'react';

const App = () => {
  // 상태 변수를 선언합니다.
  const [data, setData] = useState([]); // API로부터 받은 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 변수
  const [error, setError] = useState(null); // 에러 상태를 관리할 변수

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 API를 호출합니다.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다.');
        }
        const result = await response.json(); // JSON 형식으로 변환
        setData(result); // 데이터를 상태에 저장
      } catch (error) {
        setError(error); // 에러 발생 시 에러 상태에 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 설정

  // 로딩 중일 때 보여줄 내용
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러가 발생했을 때 보여줄 내용
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  // 정상적으로 데이터를 받아온 경우
  return (
    <div>
      <h1>받은 데이터</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> // 각 데이터 항목을 리스트로 표시
        ))}
      </ul>
    </div>
  );
};

export default App;
  -->

<!-- // 로컬 스토리지에서 메모장 텍스트 불러오기
// useEffect(() => {
// const savedMemo = localStorage.getItem("memoText");
// if (savedMemo) {
// setMemoText(savedMemo);
// }
// }, []); -->
