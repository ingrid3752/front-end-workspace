import React from "react";
import CalendarComponent from "./components/CalendarComponent";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>달력</h1>
      <CalendarComponent />
    </div>
  );
};

export default App;
