import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  /* background-color: black; */
  background-color: transparent;
  filter: invert(100%);
  border-color: transparent;
  img {
    width: 50px;
    height: 20px;
    object-fit: contain;
    opacity: ${(props) => props.opacity};
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  margin-top: 3em;
  margin-bottom: 3em;

  p {
    font-weight: 100;
    font-size: x-large;
    padding-left: 40px;
    padding-right: 40px;
  }
`;

export default function PaginationBar({ setPageNum, pageNum }) {
  const [leftOpacity, setLeftOpacity] = useState("0.33");

  const leftArrowClicked = () => {
    if (pageNum - 1 <= 0) {
      return;
    }
    if (pageNum - 1 == 1) {
      setLeftOpacity("0.33");
      setPageNum((prev) => prev - 1);
      window.scrollTo({ left: 0, top: 0 });

      return;
    }

    setLeftOpacity("1");
    setPageNum((prev) => prev - 1);
    window.scrollTo({ left: 0, top: 0 });
  };

  const rightArrowClicked = () => {
    setLeftOpacity("1");
    setPageNum((prev) => prev + 1);
    window.scrollTo({ left: 0, top: 0 });
  };

  return (
    <Container>
      <Button opacity={leftOpacity} onClick={leftArrowClicked}>
        <img src="/leftArrow.png" />
      </Button>
      <p>{pageNum}</p>
      <Button onClick={rightArrowClicked}>
        <img src="/rightArrow.png" />
      </Button>
    </Container>
  );
}
