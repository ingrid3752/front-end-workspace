import React, { useState, useEffect } from "react";
import axios from "axios";
import memoIcon from "./img/메모장.png";
import photoIcon from "./img/사진.png";
import stockIcon from "./img/주식.png";
import calendarIcon from "./img/캘린더.png";
import weatherIcon from "./img/날씨.png";
import trashIcon from "./img/휴지통.png";
import calIcon from "./img/계산기.png";
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

    // 날씨 상태를 변환하는 함수
    const getWeatherDescription = (description) => {
      if (description.includes("clear")) return "맑음";
      if (isRainyWeather(description)) return "비";
      if (description.includes("clouds")) return "구름 많음";
      if (description.includes("snow")) return "눈";
      if (description.includes("thunderstorm")) return "뇌우";
      if (description.includes("mist")) return "안개";
      return "기타"; // 기본값
    };

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const data = response.data;

      const now = new Date();
      const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
      const formattedDate = `${now.toLocaleDateString(
        "ko-KR",
        dateOptions
      )} ${now.toLocaleTimeString("ko-KR", timeOptions)}`;

      const currentTemp = Math.round(data.list[0].main.temp);
      const currentDescription = data.list[0].weather[0].description;

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toISOString().split("T")[0];

      let maxTemp = -Infinity;
      let minTemp = Infinity;

      data.list.forEach((entry) => {
        const entryDate = entry.dt_txt.split(" ")[0];
        if (entryDate === tomorrowDate) {
          const temp = entry.main.temp;
          maxTemp = Math.max(maxTemp, temp);
          minTemp = Math.min(minTemp, temp);
        }
      });

      const modalClass = isRainyWeather(currentDescription) ? "rain" : "clear";

      // 상태 업데이트
      setWeatherData({
        date: formattedDate,
        temp: `${currentTemp}°C`,
        description: getWeatherDescription(currentDescription), // 변환된 날씨 설명
        maxTemp:
          maxTemp !== -Infinity ? `${Math.round(maxTemp)}°C` : "데이터 없음",
        minTemp:
          minTemp !== Infinity ? `${Math.round(minTemp)}°C` : "데이터 없음",
        modalClass: modalClass,
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

  // 드래그 이벤트
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
            <div className="weather-info">
              <p id="data">{weatherData.date}</p>
              <p id="temp">현재 기온: {weatherData.temp}</p>
              <p id="weather">날씨: {weatherData.description}</p>
              <h3>내일의 날씨</h3>
              <p id="max-temp">최고 기온: {weatherData.maxTemp}</p>
              <p id="min-temp">최저 기온: {weatherData.minTemp}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
