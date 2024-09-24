import { useEffect, useState } from "react";
import MovieTemplate from "components/movieTemplate";
import LoaderSpinner from "components/LoaderSpinner";

export default function UpcomingPage() {
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
      "https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>{movies ? <MovieTemplate movieList={movies} /> : <LoaderSpinner />}</>
  );
}
