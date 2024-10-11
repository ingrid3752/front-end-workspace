import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [movie, setMovie] = useState([]);
  const [addMovie, setAddMovie] = useState({ title: "", genre: "", actor: "" });

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/movie");
      setMovie(response.data);
    } catch (error) {
      console.error("영화 목록 가져오기 실패:", error);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setAddMovie({ ...addMovie, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (addMovie.title && addMovie.genre && addMovie.actor) {
      try {
        await axios.post("http://localhost:8080/api/movie", addMovie);
        setMovie((prev) => [...prev, addMovie]);
        setAddMovie({ title: "", genre: "", actor: "" });
      } catch (error) {
        console.error("영화 추가 실패:", error);
      }
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>영화 추가하기</h1>
      <form onSubmit={submit}>
        <input
          name="title"
          placeholder="영화 제목"
          value={addMovie.title}
          onChange={change}
        />
        <input
          name="genre"
          placeholder="장르"
          value={addMovie.genre}
          onChange={change}
        />
        <input
          name="actor"
          placeholder="배우"
          value={addMovie.actor}
          onChange={change}
        />
        <button type="submit">영화 추가</button>
      </form>
      <h2>영화 목록</h2>
      <ul>
        {movie.map((m, index) => (
          <li key={index}>
            {m.title} - {m.genre} - {m.actor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
