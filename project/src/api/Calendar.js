import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "../assets/calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  //로컬 스토리지에서 이벤트 불러오기
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // 날짜를 클릭했을 때 새로운 일정을 추가
  const handleDateClick = (arg) => {
    const title = prompt("일정 제목을 입력하세요:");
    if (title) {
      const newEvent = { title, start: arg.dateStr };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  // 일정을 클릭했을 때 해당 일정을 삭제
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

  // 드래그 후 새로운 날짜로 일정을 업데이트
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) => {
      if (event.start === info.oldEvent.start) {
        return { ...event, start: info.event.start };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  // 날짜 일 빼기
  const handleDayCellContent = (arg) => {
    const dayNumber = arg.dayNumberText.replace("일", "");
    return dayNumber;
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
      locale="ko"
      dayCellContent={handleDayCellContent}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      editable={true}
      eventDrop={handleEventDrop}
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
