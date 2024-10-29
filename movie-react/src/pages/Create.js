import { useState } from "react";
import { addMovie } from "../api/movie";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const Create = () => {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    actor: "",
  });

  const navigate = useNavigate();

  const onCreate = async () => {
    await addMovie(movie);
    navigate("/");
  };

  return (
    <div>
      <Form
        title="영화 정보 추가"
        movie={movie}
        setMovie={setMovie}
        onSubmit={onCreate}
        submitText="영화 추가"
      />
    </div>
  );
};

export default Create;
