import Header from "../components/Header";

import { getMovies, delMovie } from "../api/movie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledDiv } from "../components/StyledDiv";

const Home = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const moviesAPI = async () => {
    const result = await getMovies();
    setMovies(result.data);
  };

  useEffect(() => {
    moviesAPI();
  }, []);

  const onDelete = async (id) => {
    await delMovie(id);
    moviesAPI();
  };

  const onDetail = (id) => {
    navigate("/" + id);
  };

  return (
    <StyledDiv>
      <Header />
      <h1>영화 목록</h1>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>장르</th>
            <th>영화배우</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td onClick={() => onDetail(movie.id)}>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.actor}</td>
              <td>
                <button onClick={() => onDelete(movie.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledDiv>
  );
};
export default Home;
