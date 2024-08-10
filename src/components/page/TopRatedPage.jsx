import { useEffect, useState } from "react";
import MovieTemplate from "item/movieTemplate";
import LoaderSpinner from "item/LoaderSpinner";

export default function TopRatedPage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjFkZjE3OGU5N2IxNjRhMjAzMGQzNmU0OTQwMWY0NiIsInN1YiI6IjY2NDE4NGVjYjg0ZWUwMTdhMjIwZDU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HqxgD4lezqaetuL5YLOvVEt2ZbGYzUUak1M8uFTRwJE",
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
