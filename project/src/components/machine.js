import React, { useState, useRef, useEffect } from "react";
import "../assets/reset.css";
import "../assets/machine.css";

const Machine = () => {
  const MAX_VALUE = 999999999999;
  const [output, setOutput] = useState(""); // 출력값 상태
  const screenRef = useRef(null); // 스크린 참조

  useEffect(() => {
    adjustFontSize(); // 폰트 크기 조정
  }, [output]);

  const formatNumber = (value) => {
    const parts = value.split(/(\D)/); // 숫자와 연산자 분리
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 쉼표 추가
    return parts.join("");
  };

  const updateOutput = (value) => {
    if (Number(value.replace(/,/g, "")) > MAX_VALUE) {
      setOutput("에러");
      return;
    }
    setOutput(formatNumber(value));
  };

  const appendValue = (val) => {
    if (output === "에러") return; // 에러 상태에서는 입력 불가
    if (isOperator(val) && (output === "" || isLastCharOperator(output))) {
      return; // 빈칸일 때나 연속된 연산자 입력 방지
    }
    updateOutput(output + val);
  };

  const toggleSign = () => {
    let currentValue = output.replace(/,/g, "");
    if (!currentValue) return;
    currentValue = String(-Number(currentValue));
    updateOutput(currentValue);
  };

  const calculateResult = () => {
    try {
      let expression = output.replace(/,/g, "");

      // 퍼센트 계산 처리
      if (expression.includes("%")) {
        expression = expression.replace(/(\d+)%/g, (match, num) => {
          return String(Number(num) / 100);
        });
      }

      const result = eval(expression); // eval 사용
      if (result > MAX_VALUE) {
        setOutput("999,999,999이하의 숫자 입력");
      } else {
        updateOutput(result.toString());
      }
    } catch (error) {
      setOutput("다시입력해주세요");
    }
  };

  const isOperator = (char) => {
    return ["%", "/", "*", "-", "+"].includes(char);
  };

  const isLastCharOperator = (value) => {
    const lastChar = value.slice(-1);
    return isOperator(lastChar);
  };

  const adjustFontSize = () => {
    let fontSize = 2.5;
    while (
      screenRef.current.scrollWidth > screenRef.current.clientWidth &&
      fontSize > 1
    ) {
      fontSize -= 0.1;
      screenRef.current.style.fontSize = fontSize + "rem";
    }
  };

  return (
    <div className="full">
      <input
        type="text"
        className="screen"
        value={output}
        readOnly
        ref={screenRef}
      />

      <div className="buttons">
        <input
          type="button"
          className="button gray"
          value="AC"
          onClick={() => updateOutput("")}
        />
        <input
          type="button"
          className="button gray"
          value="+/-"
          onClick={toggleSign}
        />
        <input
          type="button"
          className="button gray"
          value="%"
          onClick={() => appendValue("%")}
        />
        <input
          type="button"
          className="button orange"
          value="/"
          onClick={() => appendValue("/")}
        />

        <input
          type="button"
          className="button"
          value="7"
          onClick={() => appendValue("7")}
        />
        <input
          type="button"
          className="button"
          value="8"
          onClick={() => appendValue("8")}
        />
        <input
          type="button"
          className="button"
          value="9"
          onClick={() => appendValue("9")}
        />
        <input
          type="button"
          className="button orange"
          value="x"
          onClick={() => appendValue("*")}
        />

        <input
          type="button"
          className="button"
          value="4"
          onClick={() => appendValue("4")}
        />
        <input
          type="button"
          className="button"
          value="5"
          onClick={() => appendValue("5")}
        />
        <input
          type="button"
          className="button"
          value="6"
          onClick={() => appendValue("6")}
        />
        <input
          type="button"
          className="button orange"
          value="-"
          onClick={() => appendValue("-")}
        />

        <input
          type="button"
          className="button"
          value="1"
          onClick={() => appendValue("1")}
        />
        <input
          type="button"
          className="button"
          value="2"
          onClick={() => appendValue("2")}
        />
        <input
          type="button"
          className="button"
          value="3"
          onClick={() => appendValue("3")}
        />
        <input
          type="button"
          className="button orange"
          value="+"
          onClick={() => appendValue("+")}
        />
      </div>

      <div className="buttons">
        <input
          type="button"
          className="button xl"
          style={{ borderBottomLeftRadius: "15px" }}
          value="0"
          onClick={() => appendValue("0")}
        />
        <input
          type="button"
          className="button"
          value="."
          onClick={() => appendValue(".")}
        />
        <input
          type="button"
          className="button orange"
          style={{ borderBottomRightRadius: "15px" }}
          value="="
          onClick={calculateResult}
        />
      </div>
    </div>
  );
};

export default Machine;
