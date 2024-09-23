// count setCount
import { useState } from "react";
// useState
// const [변수명, 첫번째 변수명의 함수] = useState();
const App = () => {
  const [count, setCount] = useState(0);
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

  return (
    <div>
      <h1>Total Clicks : {count}</h1>
      <button onClick={setPlus}>+10</button>
      <button onClick={setMinus}>-10</button>
      <button onClick={setReset}>reset</button>
    </div>
  );
};

export default App;
