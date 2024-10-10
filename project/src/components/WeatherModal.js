import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  background-color: transparent;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const WeatherModal = ({ isVisible, onClose, weatherData }) => {
  if (!isVisible) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>날씨 정보</h2>
        <div className="weather-info">
          <p id="data">{weatherData.date}</p>
          <p id="temp">{weatherData.temp}°C</p>
          <p id="weather">{weatherData.description}</p>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default WeatherModal;
