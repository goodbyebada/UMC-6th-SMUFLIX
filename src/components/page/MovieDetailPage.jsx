import { useEffect } from "react";
import MoviewDetail from "item/MovieDetail";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LoaderSpinner from "item/LoaderSpinner";

import { styled } from "styled-components";

export default function MovieDetailPage() {
  const { id } = useParams();

  const nullData = {
    backdrop_path: "",
    poster_path: "",
    vote_average: "",
    release_date: "",
    overview: "",
  };

  const [nowMovie, setMovie] = useState(nullData);
  const [notFound, setNotFound] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const {
    backdrop_path,
    poster_path,
    vote_average,
    release_date,
    overview,
    original_title,
  } = nowMovie;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjFkZjE3OGU5N2IxNjRhMjAzMGQzNmU0OTQwMWY0NiIsInN1YiI6IjY2NDE4NGVjYjg0ZWUwMTdhMjIwZDU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HqxgD4lezqaetuL5YLOvVEt2ZbGYzUUak1M8uFTRwJE",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko`, options)
      .then((response) => response.json())
      .then((response) => {
        // 하나의 책만 오도록 임시처리
        console.log(response);

        if (response.success === false) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setNotFound(false);
        setLoading(false);

        setMovie(response);
      })
      .catch((err) => {
        console.error(err);
      })
      .then(setNotFound(true));
  }, []);

  function showComponent() {
    if (notFound) {
      return (
        <NotFound>
          <h2>Opps!</h2>
          <p>다시 검색해주세요!</p>

          <StyledLink to={"/"}>메인으로 이동하기</StyledLink>
        </NotFound>
      );
    }
    return <MoviewDetail elem={nowMovie} />;
  }

  return isLoading ? <LoaderSpinner /> : showComponent();
}

const NotFound = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  h2 {
    font-size: 100px;
  }
`;

const StyledLink = styled(Link)`
  display: inline;
  padding: 4px 8px;
  margin: 0 auto;
  color: white;
  text-decoration-line: none;
`;
