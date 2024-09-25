// import Btn from "./Btn";
// import { useState, useEffect, useRef } from "react";
// const Converter = () => {
//   const [text, setText] = useState("");
//   const setMinutes = () => {
//     setText(text / 60);
//   };
//   const textRef = useRef();
//   const write = (e) => {
//     setText(e.target.value);
//   };

//   const updateCheckRef = useRef(false);
//   useEffect(() => {
//     // false 일때 Minutes => Hours
//     // true 일때 Hours => Minutes
//     if (!updateCheckRef.current) {
//       updateCheckRef.current = true;
//       <Btn text="Hours => Minutes" />;
//       return;
//     } else {
//       <Btn text="Minutes => Hours" />;
//     }
//   }, [text]);
//   const setReset = () => {
//     setText(0);
//   };
//   return (
//     <>
//       <h1>Time Converter</h1>
//       <p>
//         Minutes : <input onChange={write} placeholder="Minutes" />
//       </p>
//       <p>
//         Hours : <input onChange={write} value={text} />
//       </p>
//       <Btn click={setReset} text="Reset" />
//       <Btn click={setMinutes} text="Minutes => Hours" />
//     </>
//   );
// };
// export default Converter;

// React HTML
import { useEffect, useState } from "react";
import Btn from "./Btn";
/*
  jQuery의 불편함(일일히 문자열삽입)을 개선 : React
  사용자의 상태에 따라 구현해야하는 내용 증가
  
  useState 초기값
  const [변수값, 함수] = useState();

  useEffect
  변화되는 부분에 활용 (ex: 서버에서 불러와서 보여줘야하는 시점)
  useEffect(() => {},[])

  useRef 별칭 부여해서 빠르게 가져옴
*/
const Converter = () => {
  // const [state값, state변수값] = useState(초기값);
  // 상태가 바뀌는 시점을 찾고자 할때 = useEffect
  const [text, setText] = useState("Minutes => Hours");
  const [bool, setBool] = useState(false);
  const [number, setNumber] = useState("");

  const invert = () => {
    setBool(!bool);
    reset();
  };

  const change = (e) => {
    setNumber(e.target.value);
  };

  const reset = () => {
    setNumber("");
  };

  useEffect(() => {
    if (bool) {
      setText("Hours => Minutes");
    } else {
      setText("Minutes => Hours");
    }
  }, [bool]);
  return (
    <>
      <h1>Time Converter</h1>
      <p>
        Minutes :{" "}
        <input
          type="number"
          placeholder="Minutes"
          disabled={bool}
          onChange={change}
          value={bool ? number * 60 : number}
        />
      </p>
      <p>
        Hours :{" "}
        <input
          type="number"
          placeholder="Hours"
          disabled={!bool}
          value={bool ? number : Math.floor(number / 60)}
          onChange={change}
        />
      </p>
      <Btn click={reset} text="Reset" />
      <Btn click={invert} text={text} />
    </>
  );
};
export default Converter;
