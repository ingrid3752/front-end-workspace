import React, { useState, useRef } from "react";
import memoIcon from "./img/메모장.png";
import photoIcon from "./img/사진.png";
import stockIcon from "./img/주식.png";
import calendarIcon from "./img/캘린더.png";
import weatherIcon from "./img/날씨.png";
import trashIcon from "./img/휴지통.png";
import machineIcon from "./img/계산기.png";
import Machine from "./components/machine.js";
import Weather from "./api/Weather.js";
import Calendar from "./api/Calendar.js";
import useMain from "./main.js";
import "./assets/weather.css";
import "./assets/reset.css";
import "./assets/App.css";
import "./assets/machine.css";
import "./assets/calendar.css";

const App = () => {
  const [isMemoOpen, setMemoOpen] = useState(false);
  const [isMachineOpen, setMachineOpen] = useState(false);
  const [isWeatherOpen, setWeatherOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const memoModalRef = useRef(null);
  const machineModalRef = useRef(null);
  const weatherModalRef = useRef(null);
  const calendarModalRef = useRef(null);

  const { startResize } = useMain(memoModalRef);

  const toggleMemo = () => setMemoOpen((prev) => !prev);
  const toggleMachine = () => setMachineOpen((prev) => !prev);
  const toggleWeather = () => setWeatherOpen((prev) => !prev);
  const toggleCalendar = () => setCalendarOpen((prev) => !prev);

  // 드래그 시작
  const handleMouseDown = (e, ref) => {
    setDragging(true);
    setCurrentModal(ref);
    setPosition({
      x: e.clientX - ref.current.getBoundingClientRect().left,
      y: e.clientY - ref.current.getBoundingClientRect().top,
    });
  };

  // 드래그 중
  const handleMouseMove = (e) => {
    if (dragging && currentModal) {
      currentModal.current.style.left = `${e.clientX - position.x}px`;
      currentModal.current.style.top = `${e.clientY - position.y}px`;
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setDragging(false);
    setCurrentModal(null);
  };

  return (
    <>
      <div id="root">
        <div
          className="main"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {isMemoOpen && (
            <div
              className="modal"
              ref={memoModalRef}
              style={{
                position: "absolute",
                width: "400px",
                height: "300px",
                left: "100px",
                top: "100px",
                zIndex: 10, // 모달의 zIndex 설정
              }}
              onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
            >
              <div className="floating-window">
                <div
                  className="resizer nw"
                  onMouseDown={(e) => startResize(e, e.target)}
                ></div>
                <div
                  className="resizer ne"
                  onMouseDown={(e) => startResize(e, e.target)}
                ></div>
                <div
                  className="resizer sw"
                  onMouseDown={(e) => startResize(e, e.target)}
                ></div>
                <div
                  className="resizer se"
                  onMouseDown={(e) => startResize(e, e.target)}
                ></div>
                <div
                  className="window-header"
                  onMouseDown={(e) => handleMouseDown(e, memoModalRef)}
                >
                  <div className="window-title">메모장</div>
                  <div className="window-controls">
                    <button
                      className="window-close"
                      onClick={toggleMemo}
                    ></button>
                  </div>
                </div>
                <div className="modal_body">
                  <textarea
                    id="memoInput"
                    name="memo"
                    placeholder="안녕~"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {isMachineOpen && (
            <div
              className="modal2"
              ref={machineModalRef}
              style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                left: "150px",
                top: "150px",
                zIndex: 10, // 모달의 zIndex 설정
              }}
              onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
            >
              <div className="modal_body2">
                <div
                  className="mheader"
                  onMouseDown={(e) => handleMouseDown(e, machineModalRef)}
                >
                  <button
                    className="window-close2"
                    onClick={toggleMachine}
                  ></button>
                </div>
                <Machine />
              </div>
            </div>
          )}

          {isWeatherOpen && (
            <Weather
              modalVisible={isWeatherOpen}
              handleCloseModal={toggleWeather}
              ref={weatherModalRef}
              onMouseDown={(e) => handleMouseDown(e, weatherModalRef)}
              style={{ zIndex: 10 }} // zIndex 설정
              onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
            />
          )}

          {isCalendarOpen && (
            <div
              className="calendar-div"
              style={{ zIndex: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                modalVisible={isCalendarOpen}
                handleCloseModal={toggleCalendar}
                ref={calendarModalRef}
                onMouseDown={(e) => handleMouseDown(e, calendarModalRef)}
              />
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.021)" }}>
          <div
            className="bottom"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.363)" }}
          >
            <div className="icon">
              <button className="btn-open-modal" onClick={toggleMemo}>
                <img src={memoIcon} alt="메모장" />
              </button>
            </div>
            <div className="icon">
              <button className="btn-open-modal">
                <img src={photoIcon} alt="사진" />
              </button>
            </div>
            <div className="icon">
              <button className="btn-open-modal">
                <img src={stockIcon} alt="주식" />
              </button>
            </div>
            <div className="icon">
              <button className="btn-open-modal" onClick={toggleCalendar}>
                <img src={calendarIcon} alt="캘린더" />
              </button>
            </div>
            <div className="icon">
              <button className="btn-open-modal" onClick={toggleWeather}>
                <img src={weatherIcon} alt="날씨" />
              </button>
            </div>
            <div className="icon">
              <button className="btn-open-modal">
                <img src={trashIcon} alt="휴지통" />
              </button>
            </div>
            <div className="icon">
              <button className="btn-open-modal" onClick={toggleMachine}>
                <img src={machineIcon} alt="계산기" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
