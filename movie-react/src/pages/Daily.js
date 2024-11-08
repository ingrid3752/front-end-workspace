import { useEffect, useState } from "react";
import { getDaily } from "../api/movie";
import { StyledDiv } from "../components/StyledDiv";
import Header from "../components/Header";

const Daily = () => {
  const yesterday = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() - 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState(yesterday(new Date()));
  const [moviebox, setMoviebox] = useState([]); // 배열로 초기화
  const dailyAPI = async (date) => {
    try {
      const response = await getDaily(date.replace(/-/g, ""));
      // 응답 데이터에서 영화 정보를 추출하여 상태에 저장
      setMoviebox(response.data.boxOfficeResult.dailyBoxOfficeList);
    } catch (error) {
      console.error("Error fetching daily box office data:", error);
    }
  };
  useEffect(() => {
    dailyAPI(date);
  }, [date]);
  return (
    <StyledDiv>
      <Header />
      <h1>일별 박스오피스</h1>
      <p>이전 날짜의 박스오피스 기록만 조회할 수 있습니다.</p>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>영화제목</th>
            <th>개봉날짜</th>
            <th>누적관객수</th>
            <th>매출</th>
          </tr>
        </thead>
        <tbody>
          {moviebox.map((movie) => (
            <tr key={movie.rank}>
              <td>{movie.rank}</td>
              <td>{movie.movieNm}</td>
              <td>{movie.openDt}</td>
              <td>{movie.audiAcc}</td>
              <td>{movie.salesAcc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledDiv>
  );
};
export default Daily;
