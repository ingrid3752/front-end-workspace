// count setCount
import { useState, useEffect, useRef } from "react";
import Btn from "./Btn";
// useState
// const [변수명, 첫번째 변수명의 함수] = useState();

const Counter = () => {
  const [count, setCount] = useState(0);
  const updateCheckRef = useRef(false);

  // 변화시키고자 하는 함수
  const setPlus = () => {
    setCount(count + 10);
  };
  const setMinus = () => {
    setCount(count - 10);
  };
  const setReset = () => {
    setCount(0);
  };

  // 마운트
  useEffect(() => {
    console.log("mount!");
  }, []);

  // 업데이트
  useEffect(() => {
    if (!updateCheckRef.current) {
      updateCheckRef.current = true;
      return;
    } else {
      console.log("count update!");
    }
  }, [count]);

  // 언마운트
  useEffect(() => {
    return () => {
      console.log("unmount!");
    };
  }, []);

  return (
    <>
      <h1>Total Clicks : {count}</h1>
      <Btn click={setPlus} text="+10" />
      <Btn click={setMinus} text="-10" />
      <Btn click={setReset} text="reset" />
    </>
  );
};

export default Counter;
