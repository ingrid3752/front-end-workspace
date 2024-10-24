import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../assets/calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    const title = prompt("일정 제목을 입력하세요:");
    if (title) {
      setEvents([...events, { title, start: arg.dateStr }]);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      setEvents(
        events.filter((event) => event.start !== clickInfo.event.start)
      );
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="ko" // 한국어 설정
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
    />
  );
};

export default Calendar;
