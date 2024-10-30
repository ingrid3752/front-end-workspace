import React, { useState, useRef, useEffect } from "react";
import "./assets/reset.css";
import "./assets/App.css";
import memoIcon from "./img/메모장.png";
import photoIcon from "./img/사진.png";
import stockIcon from "./img/주식.png";
import calendarIcon from "./img/캘린더.png";
import weatherIcon from "./img/날씨.png";
import trashIcon from "./img/휴지통.png";
import machineIcon from "./img/계산기.png";
import Machine from "./components/machine.js";
import Weather from "./api/Weather.js"; // Weather 컴포넌트 추가
import "./assets/weather.css";
import Calendar from "./api/Calendar.js";
import "./assets/calendar.css";

const App = () => {
  const [isMemoOpen, setMemoOpen] = useState(false);
  const [isMachineOpen, setMachineOpen] = useState(false);
  const [isWeatherOpen, setWeatherOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [memoText, setMemoText] = useState(""); // 메모 텍스트 상태
  const [activeModal, setActiveModal] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const memoModalRef = useRef(null);
  const machineModalRef = useRef(null);
  const weatherModalRef = useRef(null);
  const calendarModalRef = useRef(null);

  const toggleMemo = () => setMemoOpen((prev) => !prev);
  const toggleMachine = () => setMachineOpen((prev) => !prev);
  const toggleWeather = () => setWeatherOpen((prev) => !prev);
  const toggleCalendar = () => setCalendarOpen((prev) => !prev);

  // 텍스트가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (memoText) {
      localStorage.setItem("memoText", memoText);
    }
  }, [memoText]);

  // 드래그 시작
  const handleMouseDown = (e, ref) => {
    setActiveModal(ref); // 활성 모달 설정
    ref.current.style.zIndex = 1000; // 현재 z-index 설정

    // 현재 모달의 위치를 가져옵니다.
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left; // 클릭한 x 좌표와 모달의 왼쪽 위치 차이
    const offsetY = e.clientY - rect.top; // 클릭한 y 좌표와 모달의 위쪽 위치 차이

    // 드래그 상태와 오프셋을 설정합니다.
    setDragging(true);
    setPosition({ x: offsetX, y: offsetY });
  };

  // 드래그 중
  const handleMouseMove = (e) => {
    if (dragging && activeModal) {
      const modal = activeModal.current;
      modal.style.left = `${e.clientX - position.x}px`;
      modal.style.top = `${e.clientY - position.y}px`;
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setDragging(false);
    setActiveModal(null);
  };

  // ESC 키를 눌렀을 때 모달을 닫는 기능
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setMemoOpen(false);
      setMachineOpen(false);
      setWeatherOpen(false);
      setCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
              className="floating-window"
              ref={memoModalRef}
              style={{
                position: "absolute",
                left: "100px",
                top: "100px",
                zIndex: activeModal === memoModalRef ? 1000 : 999,
              }}
              onMouseDown={(e) => handleMouseDown(e, memoModalRef)}
            >
              <div className="window-header">
                <div className="window-title">메모장</div>
                <div className="window-controls">
                  <button
                    className="window-close"
                    onClick={toggleMemo}
                  ></button>
                </div>
              </div>
              <textarea
                placeholder="안녕~"
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                style={{
                  width: "100%",
                  height: "calc(100% - 30px)",
                  border: "1px solid #ccc",
                  outline: "none",
                  padding: "5px",
                  boxSizing: "border-box",
                  resize: "none",
                  overflowY: "auto",
                }}
              ></textarea>
            </div>
          )}

          {isMachineOpen && (
            <div
              className="modal2"
              ref={machineModalRef}
              style={{
                position: "absolute",
                left: "150px",
                top: "150px",
                zIndex: activeModal === machineModalRef ? 1000 : 999,
              }}
              onMouseDown={(e) => handleMouseDown(e, machineModalRef)}
            >
              <div className="modal_body2">
                <div className="mheader">
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
            <div
              className="modal3"
              ref={weatherModalRef}
              style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                left: "200px",
                top: "200px",
                zIndex: activeModal === weatherModalRef ? 1000 : 999,
              }}
              onMouseDown={(e) => handleMouseDown(e, weatherModalRef)}
            >
              <Weather
                modalVisible={isWeatherOpen}
                handleCloseModal={toggleWeather}
                setActiveModal={setActiveModal} // 추가된 부분
              />
            </div>
          )}

          {isCalendarOpen && (
            <Calendar
              modalVisible={isCalendarOpen}
              handleCloseModal={toggleCalendar}
              ref={calendarModalRef}
              onMouseDown={(e) => handleMouseDown(e, calendarModalRef)}
              style={{
                zIndex: activeModal === calendarModalRef ? 1000 : 999,
              }}
            />
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
