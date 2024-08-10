import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      className={`movie ${isHovering ? "hover" : ""} `}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={title}
      />
      <div className={` ${isHovering ? "overview" : "before-hover"} `}>
        <p>{overview}</p>
      </div>

      <div className="content">
        <span>{title}</span>
        <span>⭐️{vote_average}</span>
      </div>
    </div>
  );
}
