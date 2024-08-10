import { useEffect, useState } from "react";
import { styled } from "styled-components";

import Info from "./Info";

export default function MoviewDetail({ elem }) {
  const [castInfoList, setCastInfoList] = useState([]);
  const [crewInfoList, setCrewInfoList] = useState([]);

  const {
    id,
    title,
    backdrop_path,
    poster_path,
    vote_average,
    release_date,
    overview,
  } = elem;

  const makeStar = (vote_average) => {
    let count = Math.round(vote_average);
    let i = 0;

    let star = "";

    while (i < count) {
      count--;
      star += `⭐️`;
    }

    return star;
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjFkZjE3OGU5N2IxNjRhMjAzMGQzNmU0OTQwMWY0NiIsIm5iZiI6MTcxOTUzNTMyNC44NzA3MjcsInN1YiI6IjY2NDE4NGVjYjg0ZWUwMTdhMjIwZDU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wBUqKt4MJWdumjYJWr2YnF15zLBSotui92m_Bu8JzCU",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=ko`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCastInfoList(response.cast);
        setCrewInfoList(response.crew);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <WrapperContainer
        image={`https://image.tmdb.org/t/p/original${backdrop_path}`}
      >
        <div className="wrapper">
          <ImgContainer>
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
            />
          </ImgContainer>

          <Detial>
            <div>
              <span>제목</span>
              <span>{title}</span>
            </div>

            <div>
              <span>평점</span>
              <span>{makeStar(vote_average)}</span>
            </div>

            <div>
              <span>개봉일</span>
              <span>{release_date}</span>
            </div>

            <div>
              <p>줄거리</p>

              <p id="over_view">
                {overview === "" ? "제공된 줄거리가 없습니다." : overview}
              </p>
            </div>
          </Detial>
        </div>
      </WrapperContainer>

      <InfoTitle>캐스팅 정보</InfoTitle>
      {!castInfoList.length ? (
        ""
      ) : (
        <CastContainer>
          {castInfoList.map((elem) => {
            const { profile_path, name, original_name } = elem;

            return (
              <Info
                profile_path={profile_path}
                name={name}
                original_name={original_name}
              />
            );
          })}
        </CastContainer>
      )}

      <InfoTitle>제작진</InfoTitle>

      {!crewInfoList.length ? (
        ""
      ) : (
        <CrewContainer>
          {crewInfoList.map((elem) => {
            const { profile_path, name, original_name } = elem;

            return (
              <Info
                profile_path={profile_path}
                name={name}
                original_name={original_name}
              />
            );
          })}
        </CrewContainer>
      )}
    </div>
  );
}

const ImgContainer = styled.div`
  img {
    height: 500px;
    max-width: 300px;
    object-fit: cover;
  }
`;

const CastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #dbcd13;
  }
`;

const CrewContainer = styled(CastContainer)``;

const WrapperContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  box-sizing: content-box;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(10px);
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
`;
const Detial = styled.div`
  padding-left: 40px;
  span {
    padding-right: 30px;
  }
  div {
    margin: 20px;
  }

  #over_view {
    margin-top: 20px;
    line-height: 1cm;
  }
`;

const InfoTitle = styled.h1`
  margin-left: 10px;
  margin-top: 50px;
  font-size: x-large;
`;
