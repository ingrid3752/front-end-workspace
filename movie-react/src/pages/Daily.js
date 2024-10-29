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

  const [data, setData] = useState({
    rank: "",
    movieNm: "",
    openDt: "",
  });

  const [date, setDate] = useState(yesterday(new Date()));

  useEffect(() => {
    dailyAPI();
  }, []);

  const dailyAPI = async (date) => {
    const response = await getDaily(date.replace(/-/g, ""));
    setDate(response.data);
  };

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
          </tr>
        </thead>
        <tbody>
          <td>{data.rank}</td>
          <td>{data.movieNm}</td>
          <td>{data.openDt}</td>
        </tbody>
      </table>
    </StyledDiv>
  );
};
export default Daily;
