import Btn from "./Btn";
import { useState, useEffect, useRef } from "react";
const Converter = () => {
  const [text, setText] = useState("");
  const setMinutes = () => {
    setText(text / 60);
  };
  const textRef = useRef();
  const write = (e) => {
    setText(e.target.value);
  };

  const updateCheckRef = useRef(false);
  useEffect(() => {
    // false 일때 Minutes => Hours
    // true 일때 Hours => Minutes
    if (!updateCheckRef.current) {
      updateCheckRef.current = true;
      <Btn text="Hours => Minutes" />;
      return;
    } else {
      <Btn text="Minutes => Hours" />;
    }
  }, [text]);
  const setReset = () => {
    setText(0);
  };
  return (
    <>
      <h1>Time Converter</h1>
      <p>
        Minutes : <input onChange={write} placeholder="Minutes" />
      </p>
      <p>
        Hours : <input onChange={write} value={text} />
      </p>
      <Btn click={setReset} text="Reset" />
      <Btn click={setMinutes} text="Minutes => Hours" />
    </>
  );
};
export default Converter;
