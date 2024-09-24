import { useEffect, useState } from "react";
import MovieTemplate from "components/movieTemplate";
import LoaderSpinner from "components/LoaderSpinner";

export default function TopRatedPage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TOKEN,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1&api_key=bb1df178e97b164a2030d36e49401f46",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
  }, [movies]);

  return (
    <>{movies ? <MovieTemplate movieList={movies} /> : <LoaderSpinner />}</>
  );
}
