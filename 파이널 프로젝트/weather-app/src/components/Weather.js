import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst",
          {
            params: {
              serviceKey:
                "d9vi4rtd5J5g4CHzmFVcVogjnECDUvFif4GWKcrRSztRAFaLuuABqMHS1HZ0Lb5jt3U30P9EJbVd2kkUKavBWw%3D%3D",
              pageNo: 1,
              numOfRows: 10,
              dataType: "JSON",
              base_date: "20240928", // 날짜
              base_time: "1830", // 시간
              nx: 60, // X 좌표
              ny: 127, // Y 좌표
            },
          }
        );
        console.log("API :", response.data);
        const items = response.data.response?.body?.items?.item;

        if (items && items.length > 0) {
          setWeatherData(items);
        } else {
          setError("유효한 데이터가 반환되지 않았습니다.");
        }
      } catch (error) {
        console.error(
          "API 호출 중 오류 발생:",
          error.response ? error.response.data : error.message
        );
        setError("날씨 데이터를 불러오는 중에 오류가 발생했습니다.");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>날씨 정보</h1>
      {error && <p>{error}</p>}
      {weatherData.length > 0 ? (
        <ul>
          {weatherData.map((item, index) => (
            <li key={index}>
              {item.fcstDate} {item.fcstTime} - {item.category}:{" "}
              {item.fcstValue}
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터</p>
      )}
    </div>
  );
};

export default Weather;
