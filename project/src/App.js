import React, { useState } from "react";
import IconButton from "./components/IconButton";
import WeatherModal from "./components/WeatherModal";
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
          <IconButton imgSrc="../img/메모장.png" altText="메모장" />
          <IconButton imgSrc="../img/사진.png" altText="갤러리" />
          <IconButton imgSrc="../img/주식.png" altText="코인" />
          <IconButton imgSrc="../img/캘린더.png" altText="캘린더" />
          <IconButton
            imgSrc="../img/날씨.png"
            altText="날씨"
            onClick={handleWeatherButtonClick}
          />
          <IconButton imgSrc="../img/휴지통.png" altText="휴지통" />
        </div>
      </div>
      <WeatherModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;
