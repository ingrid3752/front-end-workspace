import Calendar from "react-calendar";

<Calendar
  onChange={handleDateChange}
  onDrillDown={handleMonthChange}
  value={value}
  formatDay={(local, date) => moment(date).format("D")}
  nextLabel={<NextIcon handleDate={handleDate} />}
  prevLabel={<PreviousIcon handleDate={handleDate} />}
  next2Label={null}
  prev2Label={null}
  tileContent={({ date, view }) => {
    const html = [];
    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      html.push(<div className="dot"></div>);
    }
    return (
      <>
        <div className="flex justify-center items-center absoluteDiv">
          {html}
        </div>
      </>
    );
  }}
></Calendar>;
