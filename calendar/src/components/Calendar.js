import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={date} />
      <div className="selected-date">
        <p>선택한 날짜: {date.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Calendar;
