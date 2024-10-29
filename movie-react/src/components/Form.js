import styled from "styled-components";
import Header from "./Header";

const StyledDiv = styled.div`
  width: 900px;
  margin: auto;
  text-align: center;
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  input {
    width: 100%;
    margin: 5px;
    padding: 5px;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    margin: 5px;
    cursor: pointer;
    background: black;
    color: white;
    font-weight: bold;
    padding: 10px;
  }
`;

const Form = ({ titleText, movie, setMovie, onSubmit, submitText }) => {
  return (
    <StyledDiv>
      <Header />
      <h1>{titleText}</h1>
      <input
        type="text"
        placeholder="영화 제목 입력"
        value={movie.title}
        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="영화 장르 입력"
        value={movie.genre}
        onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
      />
      <input
        type="text"
        placeholder="영화 배우들 입력"
        value={movie.actor}
        onChange={(e) => setMovie({ ...movie, actor: e.target.value })}
      />
      <button onClick={onSubmit}>{submitText}</button>
    </StyledDiv>
  );
};
export default Form;
