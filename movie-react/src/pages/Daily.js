import { useEffect, useState } from "react";
import { getDaily } from "../api/movie";
import { StyledDiv } from "../components/StyledDiv";
import Header from "../components/Header";

// 2번 문제 -----------------------------------------------------------------------

const Daily = () => {
  const yesterday = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() - 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(yesterday(new Date()));
  const [boxOfficeData, setBoxOfficeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dailyAPI = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDaily(date.replace(/-/g, ""));
      setBoxOfficeData(response.boxOfficeResult.dailyBoxOfficeList); // API 응답 구조에 맞게 수정
    } catch (err) {
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
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

      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>영화제목</th>
            <th>개봉날짜</th>
          </tr>
        </thead>
        <tbody>
          {boxOfficeData.map((movie) => (
            <tr key={movie.rank}>
              <td>{movie.rank}</td>
              <td>{movie.movieNm}</td>
              <td>{movie.openDt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledDiv>
  );
};

export default Daily;
