import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 캘린더 스타일 임포트
import "./App.css"; // 추가적인 스타일을 위한 CSS 파일

const App = () => {
  const [date, setDate] = useState(new Date()); // 기본 날짜 상태

  const handleDateChange = (newDate) => {
    setDate(newDate); // 선택한 날짜로 상태 업데이트
  };

  return (
    <div className="calendar-container">
      <h1>메인 캘린더</h1>
      <div className="main-calendar">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="large-calendar"
        />
        <div className="small-calendar">
          <h2>스몰 캘린더</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="small"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
