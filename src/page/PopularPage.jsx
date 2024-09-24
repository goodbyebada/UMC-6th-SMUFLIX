import { useEffect, useState } from "react";
import MovieTemplate from "components/movieTemplate";
import PaginationBar from "components/PaginationBar";
import LoaderSpinner from "components/LoaderSpinner";

export default function PopularPage() {
  const [movies, setMovies] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TOKEN,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${pageNum}&api_key=bb1df178e97b164a2030d36e49401f46`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
  }, [pageNum]);

  return (
    <>
      {movies ? <MovieTemplate movieList={movies} /> : <LoaderSpinner />}
      <PaginationBar setPageNum={setPageNum} pageNum={pageNum} />
    </>
  );
}
