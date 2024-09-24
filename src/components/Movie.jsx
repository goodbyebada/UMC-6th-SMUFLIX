import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

export default function Movie({ props }) {
  const [isHovering, setHover] = useState(false);
  const { poster_path, title, vote_average, overview, id } = props;
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const onClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Wrapper
      className={`${isHovering ? "hover" : ""}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={title}
      />

      <HoveredOverview $isHovering={isHovering}>
        <p>{overview === "" ? "제공된 정보가 없습니다." : overview}</p>
      </HoveredOverview>

      <div className="content">
        <span>{title}</span>
        <span>⭐️ {Math.round(vote_average)}</span>
      </div>
    </Wrapper>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  animation: 2s ${fadeIn} ease-out;

  background-color: rgb(57, 57, 136);
  min-height: 373px;
  border-radius: 5px;
  position: relative;
  box-sizing: content-box;

  .content {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px 50px 10px;
  }

  img {
    min-height: 80%;
    height: 80%;
    width: 100%;
  }

  .hover {
    img {
      opacity: 0.5;
    }
  }
`;

const HoveredOverview = styled.div`
  display: none;

  ${(props) =>
    props.$isHovering &&
    css`
      display: block;
      position: absolute;
      font-size: 15px;

      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);

      color: white;
      padding: 20px;
      margin: 0;

      p {
        height: 100%;
        overflow: hidden;
      }
    `}
`;
