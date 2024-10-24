import React, { useState, useEffect } from "react";
import axios from "axios";
// import { TbReload } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import "../assets/weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
const Weather = ({ modalVisible, handleCloseModal }) => {
  const API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d"; // API 키
  const [weatherData, setWeatherData] = useState({
    date: "",
    temp: "",
    description: "",
    modalClass: "",
    todayMaxTemp: "",
    todayMinTemp: "",
    maxTemp: "",
    minTemp: "",
    futureWeather: [],
  });
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isRainyWeather = (description) => {
    const rainyConditions = [
      "rain",
      "moderate rain",
      "heavy rain",
      "light rain",
      "shower rain",
      "thunderstorm",
    ];
    return rainyConditions.some((condition) => description.includes(condition));
  };
  const geoFindMe = () => {
    if (!navigator.geolocation) {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  };
  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return require("../img/맑음아이콘.png");
    if (isRainyWeather(description)) return require("../img/비아이콘.png");
    if (description.includes("few clouds"))
      return require("../img/약간흐림아이콘.png");
    if (description.includes("overcast") || description.includes("clouds"))
      return require("../img/구름아이콘.png");
    if (description.includes("snow")) return require("../img/눈아이콘.png");
    if (description.includes("thunderstorm"))
      return require("../img/뇌우아이콘.png");
    if (description.includes("mist")) return require("../img/안개아이콘.png");
  };
  const onGeoOk = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const getWeatherDescription = (description) => {
      if (description.includes("clear")) return "맑음";
      if (isRainyWeather(description)) return "비";
      if (description.includes("overcast") || description.includes("clouds")) {
        return description.includes("few clouds") ? "약간 흐림" : "흐림";
      }
      if (description.includes("snow")) return "눈";
      if (description.includes("thunderstorm")) return "뇌우";
      if (description.includes("mist")) return "안개";
      return "기타";
    };
    const getDayOfWeek = (date) => {
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      return days[date.getDay()];
    };
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? "오후" : "오전";
      const formattedHours = hours % 12 || 12; // 12시간제
      return `${period} ${formattedHours}시 ${
        minutes < 10 ? "0" : ""
      }${minutes}분`;
    };
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = response.data;
      const now = new Date();
      const formattedDate = `${
        now.getMonth() + 1
      }월 ${now.getDate()}일 ${getDayOfWeek(now)} ${getCurrentTime()}`;
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
      const daysAhead = [1, 2, 3, 4]; // +1일부터 +4일까지
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
          formattedDate: `${getDayOfWeek(futureDate)}`,
          maxTemp:
            maxTempFuture !== -Infinity
              ? `${Math.round(maxTempFuture)}°`
              : "데이터 없음",
          minTemp:
            minTempFuture !== Infinity
              ? `${Math.round(minTempFuture)}°`
              : "데이터 없음",
          icon: getWeatherIcon(
            data.list.find(
              (entry) => entry.dt_txt.split(" ")[0] === futureDateString
            )?.weather[0].description || ""
          ),
        };
      });
      const modalClass = isRainyWeather(currentDescription)
        ? "rain"
        : currentDescription.includes("clouds")
        ? "clouds"
        : currentDescription.includes("snow")
        ? "snow"
        : currentDescription.includes("thunderstorm")
        ? "thunderstorm"
        : currentDescription.includes("mist")
        ? "mist"
        : "clear";
      setWeatherData({
        date: formattedDate,
        temp: `${currentTemp}°`,
        description: getWeatherDescription(currentDescription),
        maxTemp: `${Math.round(maxTempToday)}°`,
        minTemp: `${Math.round(minTempToday)}°`,
        todayMaxTemp:
          maxTempToday !== -Infinity
            ? `${Math.round(maxTempToday)}°`
            : "데이터 없음",
        todayMinTemp:
          minTempToday !== Infinity
            ? `${Math.round(minTempToday)}°`
            : "데이터 없음",
        futureWeather,
        modalClass,
      });
    } catch (error) {
      console.error("날씨 정보를 가져오는 중 오류 발생:", error);
    }
  };
  const onGeoError = () => {
    alert("위치를 찾을 수 없습니다.");
  };
  // const handleRefresh = () => {
  //   geoFindMe(); // 새로고침
  // };
  // 드래그 기능
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
  useEffect(() => {
    geoFindMe();
  }, []);
  if (!modalVisible) return null;
  return (
    <>
      <div className="modal3">
        <div
          className={`modal-content ${weatherData.modalClass}`}
          style={{ left: modalPosition.x, top: modalPosition.y }}
          onMouseDown={handleMouseDown}
        >
          <button className="close" onClick={handleCloseModal}>
            <FaCircle size="12" color="#EE5F5B" />
          </button>
          <div className="weather-info">
            <p id="temp">{weatherData.temp}</p>
            <p id="weather">{weatherData.description}</p>
            <p id="today">
              최고: {weatherData.todayMaxTemp}&nbsp; 최저:{" "}
              {weatherData.todayMinTemp}
            </p>
            <div className="futureGray">
              <p className="futurep">
                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                &nbsp; 4일간의 일기예보
              </p>
              <hr />
              <div className="width">
                {weatherData.futureWeather.map((weather, index) => (
                  <div key={index} className="widwid">
                    <h4>{weather.formattedDate}</h4>
                    <img src={weather.icon} className="small-icon" />
                    <p className="ppp">최고: {weather.maxTemp}</p>
                    <p className="ppp">최저: {weather.minTemp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
