import { getFetchThen, getAwait, getAxios } from "./api/movie";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  const loadFetchThen = () => {
    getFetchThen().then((result) => {
      setData(result);
    });
  };

  const loadAwait = async () => {
    const result = await getAwait();
    setData(result);
  };

  const loadAxios = async () => {
    const result = await getAxios();
    setData(result);
  };

  useEffect(() => {
    // loadFetchThen();
    // loadAwait();
    loadAxios();
  }, []);
  return (
    <>
      {data.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <h2>{movie.genre}</h2>
          <p>{movie.actor}</p>
        </div>
      ))}
    </>
  );
};
export default App;
