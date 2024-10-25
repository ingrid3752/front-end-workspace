import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
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
  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace("일", "");
    return dayNumber;
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
      locale="ko" // 한국어 설정
      dayCellContent={handleDayCellContent}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      headerToolbar={{
        start: "prev,today,next,customButton",
        center: "title",
        end: "listDay,listWeek,listMonth,dayGridMonth",
      }}
      views={{
        listDay: { buttonText: "일" },
        listWeek: { buttonText: "주" },
        listMonth: { buttonText: "월" },
        dayGridMonth: { buttonText: "월별 보기" },
      }}
      // footerToolbar={{
      //   start: "",
      //   center: "",
      //   end: "",
      // }}
      customButtons={{
        customButton: {
          text: "클릭",
          click: () => alert("커스텀 버튼 클릭!"),
        },
      }}
    />
  );
};

export default Calendar;
