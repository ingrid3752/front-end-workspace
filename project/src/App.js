import memoIcon from "./img/메모장.png";
import photoIcon from "./img/사진.png";
import stockIcon from "./img/주식.png";
import calendarIcon from "./img/캘린더.png";
import weatherIcon from "./img/날씨.png";
import trashIcon from "./img/휴지통.png";
import calIcon from "./img/계산기.png";
import React, { useState } from "react";
import WeatherModal2 from "./components/WeatherModal2";
import "./assets/weatherModal.css"; // assets 폴더에서 스타일 import
import "./assets/main.css";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weatherData, setWeatherData] = useState({
    date: "2024년 10월 10일",
    temp: "20",
    description: "맑음",
  });
  const handleWeatherButtonClick = () => {
    // 날씨 데이터 가져오는 로직을 추가
    setModalVisible(true);
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="main">
      <div className="main2"></div>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.021)" }}>
        <div
          className="bottom"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.363)" }}
        >
          <img src={memoIcon} alt="메모장" />
          <img src={photoIcon} alt="사진" />
          <img src={stockIcon} alt="주식" />
          <img src={calendarIcon} alt="달력" />
          <img
            src={weatherIcon}
            alt="날씨"
            onClick={handleWeatherButtonClick}
          />
          <img src={trashIcon} alt="휴지통" />
          <img src={calIcon} alt="계산기" />
        </div>
      </div>
      <WeatherModal2
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;
