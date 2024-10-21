import React, { useState, useEffect } from "react";
import axios from "axios";
import memoIcon from "./img/메모장.png";
import photoIcon from "./img/사진.png";
import stockIcon from "./img/주식.png";
import calendarIcon from "./img/캘린더.png";
import weatherIcon from "./img/날씨.png";
import trashIcon from "./img/휴지통.png";
import calIcon from "./img/계산기.png";
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

    // 요일을 반환하는 함수
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
      const daysAhead = [2, 3, 4]; // 2일, 3일, 4일
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

              {/* 내일의 날씨 정보 */}
              <h3>{weatherData.tomorrowDate}</h3>
              <p id="tomorrow">
                최고: {weatherData.maxTemp} 최저: {weatherData.minTemp}
              </p>

              {/* +2일, +3일, +4일의 날씨 정보 표시 */}
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
