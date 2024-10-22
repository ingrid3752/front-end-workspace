import React, { useState } from "react";
import memoIcon from "./img/메모장.png";
import photoIcon from "./img/사진.png";
import stockIcon from "./img/주식.png";
import calendarIcon from "./img/캘린더.png";
import weatherIcon from "./img/날씨.png";
import trashIcon from "./img/휴지통.png";
import calIcon from "./img/계산기.png";
import Weather from "./components/Weather";
import "./assets/weather.css";
import "./assets/main.css";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handleWeatherButtonClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // 드래그 기능 (추가)
  const handleMouseDown = (e) => {
    setModalPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

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

      <Weather
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        modalPosition={modalPosition}
      />
    </div>
  );
};

export default App;
