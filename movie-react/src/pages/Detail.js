import { useState, useEffect } from "react";
import { getMovie, updateMovie } from "../api/movie";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    actor: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const result = await getMovie(id);
      setMovie(result.data);
    };

    fetchMovie();
  }, [id]);

  const onUpdate = async () => {
    await updateMovie(movie);
    navigate("/");
  };

  return (
    <div>
      <Form
        titleText="영화 정보"
        movie={movie}
        setMovie={setMovie}
        onSubmit={onUpdate}
        submitText="영화 수정"
      />
    </div>
  );
};

export default Detail;
