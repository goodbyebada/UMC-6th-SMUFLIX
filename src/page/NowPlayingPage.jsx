import { useEffect, useState, useRef } from "react";
import MovieTemplate from "components/movieTemplate";
import LoaderSpinner from "components/LoaderSpinner";
import { styled } from "styled-components";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setLoading] = useState(true);
  //observer을 위한 isLoading

  const fetchData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TOKEN,
      },
    };

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko&page=${pageNum}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (Array.isArray(movies)) {
          setMovies((prevData) => [...prevData, ...response.results]);
        } else {
          setMovies(response.results);
          // 맨 처음 호출용
        }

        setLoading(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(fetchData, [pageNum]);

  // Intersection Observer 설정

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !movies) {
      setPageNum((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  return (
    <>
      {movies ? <MovieTemplate movieList={movies} /> : <LoaderSpinner />}
      {isLoading && <LoaderSpinner />}
      <div id="observer"></div>
    </>
  );
}
