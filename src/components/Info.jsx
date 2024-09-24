import { styled } from "styled-components";

export default function Info({ profile_path, name, original_name }) {
  const dummy_path =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s";

  return (
    <>
      <Container>
        <ImgContainer>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/original${profile_path}`
                : dummy_path
            }
            alt={name}
          />
        </ImgContainer>

        <div>{name}</div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  div {
    margin: 10px;
    text-align: center;
  }
`;
const ImgContainer = styled.div`
  margin: auto 0;

  img {
    height: 150px;
    max-width: 100px;

    object-fit: cover;
    border: solid;
    border-radius: 50px;
  }
`;
