import Movie from "./Movie";
import styled from "styled-components";

export default function MovieTemplate({ movieList }) {
  return (
    <Wrapper>
      {movieList.map((movie) => (
        <Movie key={movie.id} props={movie} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 열 */
  gap: 10px;
  padding: 10px 10% 0 10%;
  box-sizing: content-box;
`;
