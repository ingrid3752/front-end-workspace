import React, { useEffect, useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 호출
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "1ac5c3bc3e021420776e84bfd9c5de39"; // 발급받은 API 키 입력
        const response = await fetch(
          `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${apiKey}&curPage=1&itemPerPage=20`
        );

        if (!response.ok) {
          throw new Error("네트워크 응답이 정상이 아닙니다.");
        }

        const result = await response.json(); // JSON 형식으로 변환
        setMovies(result.movieListResult.movieList); // 영화 리스트 상태에 저장
      } catch (error) {
        setError(error); // 에러 발생 시 에러 상태에 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchMovies(); // fetchMovies 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  // 로딩 중일 때 보여줄 내용
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러가 발생했을 때 보여줄 내용
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  // 정상적으로 데이터를 받아온 경우
  return (
    <div>
      <h1>영화 목록</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.movieCd}>
            <strong>{movie.movieNm}</strong> ({movie.openDt}){" "}
            {/* 영화 제목과 개봉일 표시 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
