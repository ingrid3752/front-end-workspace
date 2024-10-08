import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // 스타일 파일 추가

const WEATHER_API_KEY = "464ce89f05d310c3ebcdad8c20e4af4d";
const KAKAO_API_KEY = "5e8cee045b9aba2d94e7c7917da371e0";

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
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
  });

  useEffect(() => {
    const fetchLocation = async () => {
      if (latitude && longitude) {
        try {
          const response = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
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
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const weatherData = await weatherResponse.json();
          setCurrentWeather(weatherData);

          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const forecastData = await forecastResponse.json();
          const filteredForecast = forecastData.list.filter(
            (_, index) => index % 8 === 0
          );
          setForecast(filteredForecast);
        } catch (error) {
          setError("Failed to fetch weather data");
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(formatWeatherData(response.data));
      setModalVisible(true);
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
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({
        left: `${e.clientX - offset.x}px`,
        top: `${e.clientY - offset.y}px`,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setWeatherData(null);
  };

  return (
    <div>
      <button onClick={geoFindMe}>현재 날씨 보기</button>

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
                <p>도시: {location ? location : currentWeather.name}</p>
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
                        <img
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          alt="날씨 아이콘"
                        />
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

export default App;
