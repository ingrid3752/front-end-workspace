import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { IoIosCheckboxOutline } from "react-icons/io";
import CalendarSmall from "./Calendarsmall";
import "../assets/calendar.css";

const MyCalendar = ({ handleCloseModal }) => {
  // 이름 변경
  const [events, setEvents] = useState([]); // 이벤트 목록 관리
  const [selectedColor, setSelectedColor] = useState("#6074f8"); // 기본 이벤트 색상
  const [selectedColors, setSelectedColors] = useState([
    { label: "주준영", color: "#6074f8" },
    { label: "조창현", color: "#29DB47" },
  ]); // 색상 버튼 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [newColor, setNewColor] = useState("#000000"); // 새 색상
  const [newLabel, setNewLabel] = useState(""); // 새 레이블
  const calendarRef = useRef(null); // FullCalendar 인스턴스 접근

  // 로컬 스토리지에서 이벤트 불러오기
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // 날짜 클릭 시 이벤트 추가
  const handleDateClick = (arg) => {
    const title = prompt("일정 제목을 입력하세요:");
    if (title) {
      const newEvent = {
        title,
        start: arg.dateStr,
        backgroundColor: selectedColor,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  // 일정 클릭 시 삭제
  const handleEventClick = (clickInfo) => {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      const updatedEvents = events.filter(
        (event) =>
          event.title !== clickInfo.event.title &&
          event.start !== clickInfo.event.start
      );
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  // 일정 드래그 후 업데이트
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.start === info.oldEvent.start) {
        return { ...event, start: info.event.start };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  // 날짜 일(badge) 제거
  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace("일", "");
    return dayNumber;
  };

  // 뷰 전환 핸들러
  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
  };

  // 새로운 색상 버튼 추가
  const addColorButton = () => {
    setIsModalOpen(true); // 모달 열기
  };

  // 모달에서 색상과 레이블 추가
  const handleAddColor = () => {
    if (newLabel && newColor) {
      setSelectedColors([
        ...selectedColors,
        { label: newLabel, color: newColor },
      ]);
      setNewColor("#000000"); // 색상 초기화
      setNewLabel(""); // 레이블 초기화
      setIsModalOpen(false); // 모달 닫기
    } else {
      alert("이름과 색상을 모두 입력하세요.");
    }
  };

  // 색상 버튼 삭제
  const handleDeleteColor = (index) => {
    const updatedColors = selectedColors.filter((_, i) => i !== index);
    setSelectedColors(updatedColors);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="calendarmain">
      {/* 사이드 메뉴 */}
      <div className="calendarside">
        <div className="sideheader">
          <button className="window-close3" onClick={handleCloseModal}></button>
        </div>
        <div className="sidetext">
          <div className="sidesideheader">
            <p>User</p>{" "}
            <button onClick={addColorButton} className="plusbutton">
              +
            </button>
          </div>
          <div className="color-buttons">
            {selectedColors.map((colorObj, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  onClick={() => setSelectedColor(colorObj.color)}
                  style={{
                    backgroundColor: colorObj.color,
                    margin: "5px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    color: "#fff",
                    minWidth: "150px",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IoIosCheckboxOutline
                    style={{ marginRight: "15px", marginLeft: "3px" }}
                  />
                  {colorObj.label}
                </button>
                <button
                  onClick={() => handleDeleteColor(index)}
                  style={{
                    marginLeft: "3px",
                    border: "none",
                    backgroundColor: "gray",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "5px",
                    width: "15px",
                    height: "15px",
                    textAlign: "center",
                    marginTop: "3px",
                    paddingBottom: "1px",
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <br />
        </div>
        <div className="smallcalendar"></div>
      </div>

      {/* FullCalendar 본체 */}
      <div className="calendar-div">
        <div className="calheader">
          <div className="calheaderplus"></div>
          <button
            onClick={() => handleViewChange("dayGridMonth")}
            className="headerbutton"
          >
            월별
          </button>
          <button
            onClick={() => handleViewChange("listDay")}
            className="headerbutton"
          >
            일
          </button>
          <button
            onClick={() => handleViewChange("listWeek")}
            className="headerbutton"
          >
            주
          </button>
          <button
            onClick={() => handleViewChange("listMonth")}
            className="headerbutton"
          >
            월
          </button>
        </div>

        <div className="background">
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            locale="ko"
            dayCellContent={handleDayCellContent}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            editable={true}
            eventDrop={handleEventDrop}
            headerToolbar={{
              start: "title",
              center: "",
              end: "prev,today,next",
            }}
            views={{
              listDay: { buttonText: "일" },
              listWeek: { buttonText: "주" },
              listMonth: { buttonText: "월" },
              dayGridMonth: { buttonText: "월별" },
            }}
          />
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal4">
          <div className="modal-content4">
            <span className="close4" onClick={closeModal}>
              &times;
            </span>
            <p>추가</p>
            <div className="plusinput">
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="nameinput"
              />
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="colorinput"
              />
            </div>
            <button onClick={handleAddColor}>추가</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
