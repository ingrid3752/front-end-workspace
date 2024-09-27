import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [temperature, setTemperature] = useState(); // 기온 상태
  const [precipitation, setPrecipitation] = useState(); // 강수 상태
  const [humidity, setHumidity] = useState(); // 습도
  const [sky, setSky] = useState(); // 하늘 상태
  const [windSpeed, setWindSpeed] = useState(); // 풍속
  const [rainProbability, setRainProbability] = useState(); // 강수 확률
  const [location, setLocation] = useState("서울");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
          {
            params: {
              serviceKey:
                "d9vi4rtd5J5g4CHzmFVcVogjnECDUvFif4GWKcrRSztRAFaLuuABqMHS1HZ0Lb5jt3U30P9EJbVd2kkUKavBWw%3D%3D", // 발급받은 API 키
              base_date: "20240927", // 예시 날짜 (YYYYMMDD 형식)
              base_time: "1600", // 예시 시간 (HHMM 형식)
              nx: "60", // 서울의 X 좌표
              ny: "127", // 서울의 Y 좌표
              numOfRows: 10, // 여러 항목을 가져오기 위해 충분한 데이터 수 설정
              pageNo: 1,
              dataType: "JSON", // JSON 형식으로 데이터를 요청
            },
          }
        );
        const items = response.data.response.body.items.item;
        // category 값에 따라 데이터를 필터링하여 각 기상 요소를 가져옴
        const tempItem = items.find((item) => item.category === "T1H"); // 기온
        const ptyItem = items.find((item) => item.category === "PTY"); // 강수 형태
        const rehItem = items.find((item) => item.category === "REH"); // 습도
        const skyItem = items.find((item) => item.category === "SKY"); // 하늘 상태
        const wsdItem = items.find((item) => item.category === "WSD"); // 풍속
        const popItem = items.find((item) => item.category === "POP"); // 강수 확률

        if (tempItem) {
          setTemperature(tempItem.fcstValue); // 기온
        }
        if (ptyItem) {
          setPrecipitation(ptyItem.fcstValue); // 강수 형태
        }
        if (rehItem) {
          setHumidity(rehItem.fcstValue); // 습도
        }
        if (skyItem) {
          setSky(skyItem.fcstValue); // 하늘 상태
        }
        if (wsdItem) {
          setWindSpeed(wsdItem.fcstValue); // 풍속
        }
        if (popItem) {
          setRainProbability(popItem.fcstValue); // 강수 확률
        }
      } catch (error) {
        console.error("날씨 데이터를 불러오는 중 오류가 발생했습니다", error); // 에러
      }
    };
    fetchWeather(); // 컴포넌트가 렌더링될 때 날씨 데이터 가져오기
  }, []);
  return (
    <div>
      <h1>{location} 날씨</h1>
      {temperature !== null && precipitation !== null && sky !== null ? (
        <div>
          <p>기온: {temperature}°C</p>
          <p>강수 형태: {precipitation === "0" ? "없음" : "비/눈"}</p>
          <p>
            하늘 상태:{" "}
            {sky === "1" ? "맑음" : sky === "3" ? "구름 많음" : "흐림"}
          </p>
          <p>습도: {humidity}%</p>
          <p>풍속: {windSpeed} m/s</p>
          <p>강수 확률: {rainProbability}%</p>
        </div>
      ) : (
        <p>로딩 중...</p> // 데이터 로딩 중일 때 표시
      )}
    </div>
  );
};
export default Weather;
