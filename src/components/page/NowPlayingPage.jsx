import { useEffect, useState, useRef } from "react";
import MovieTemplate from "item/movieTemplate";
import LoaderSpinner from "item/LoaderSpinner";
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjFkZjE3OGU5N2IxNjRhMjAzMGQzNmU0OTQwMWY0NiIsInN1YiI6IjY2NDE4NGVjYjg0ZWUwMTdhMjIwZDU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HqxgD4lezqaetuL5YLOvVEt2ZbGYzUUak1M8uFTRwJE",
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
      {isLoading && (
        <Container>
          <LoaderSpinner />
        </Container>
      )}
      <div id="observer"></div>
    </>
  );
}

const Container = styled.div`
  height: 200px;
`;
