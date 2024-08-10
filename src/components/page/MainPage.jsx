import styled from "styled-components";
import Movie from "item/Movie";
import { useEffect, useState } from "react";
import useDebounce from "custom/useDebounce";
import { isTokenStored } from "custom/token";

export default function MainPage({ isLoggedIn }) {
  const [text, setText] = useState("");
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [username, setUserName] = useState(null);
  const [tokenCheckAgain, setCheckAgain] = useState(false);

  /**
   * fetch함수
   */
  const searchData = (queryString) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjFkZjE3OGU5N2IxNjRhMjAzMGQzNmU0OTQwMWY0NiIsIm5iZiI6MTcxOTUzNTMyNC44NzA3MjcsInN1YiI6IjY2NDE4NGVjYjg0ZWUwMTdhMjIwZDU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wBUqKt4MJWdumjYJWr2YnF15zLBSotui92m_Bu8JzCU",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${queryString}&include_adult=false&language=ko&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieList(response.results);
        setLoading(false);

        console.log(response.results);
      })
      .catch((err) => console.error(err));
  };

  const onChange = (e) => {
    const input = e.target.value;
    setText(input);
    setLoading(true);

    if (input === "") {
      setEmpty(true);
      return;
    }
    setEmpty(false);
  };

  //검색 버튼 눌렀을시에만 검색하기 위해 미리 만들어놓음
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const queryString = useDebounce(text, 2000);

  //after Debounce
  useEffect(() => {
    setLoading(false);
    searchData(queryString);
  }, [queryString]);

  /**
   * 스토리지에 있는 username이 null이 아닐때까지 무한 렌더링..
   * 이것보단 디바운스가 나을듯 했지만,
   * 로컬 스토리지를 확인할 트리거가 딱히 없기에 렌더링이 낫다 판단.
   *
   * 그냥 / 이동전에 localstorage에 저장하면 안되나?
   */
  useEffect(() => {
    const username = window.localStorage.getItem("username");
    if (!username) {
      //null이라면,
      setCheckAgain((prev) => !prev);
      return;
    }

    setUserName(username);
  }, [tokenCheckAgain]);

  /**
   * username 처음 도착하지 않았을땐 null, 로딩중..
   * username이 null 이라면 로그아웃 상태 => 환영합니다.
   * username이 !null => ${username} 환영합니다
   *
   * 로그인 후 바로 유저 데이터를 못 받아온다.
   * 때문에 LoginPage 에서의 isLoggedIn으로 1차 로직
   * 유저데이터 받아왔을때의 트리거?
   *
   * fetch함수가 데이터를 받아왔을때
   * -> loginpage에 있음
   *
   * navigate로 이동할때 데이터 전달하는 방법 있음
   *
   *
   */

  return (
    <MainPageBody id="main-page">
      <Welcome>
        {isLoggedIn
          ? username
            ? `${username}님 환영합니다.`
            : "로딩중.."
          : "환영합니다."}
      </Welcome>
      <Search onSubmit={onSubmit}>
        <h2> Find your movies!</h2>
        <div className={"input-contianer"}>
          <input onChange={onChange} value={text} />
          <button>🔎</button>
        </div>

        {empty ? (
          ""
        ) : loading ? (
          <Notice>로딩중입니다.</Notice>
        ) : !movieList.length ? (
          <Notice>검색결과가 없습니다.</Notice>
        ) : (
          <MovieTempalte>
            {movieList.map((movie) => (
              <Movie key={movie.id} props={movie} />
            ))}
          </MovieTempalte>
        )}
      </Search>
    </MainPageBody>
  );
}

const MainPageBody = styled.div`
  /* min-height: calc(
    100% - ${(props) => props.navHeight}px - ${(props) => props.footerHeight}px
  ); */
  min-height: 100%;
`;

const Welcome = styled.div`
  height: 300px;
  text-align: center;
  background-color: rgba(0, 0, 0);
  font-size: large;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MovieTempalte = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-sizing: content-box;
  color: white;

  height: 500px;
  width: 60%;
  margin: 0 auto;
  gap: 10px;
  background-color: #0b0445c2;
  padding-top: 20px;
  padding-right: 40px;
  padding-left: 40px;
  padding: 20px 60px 20px 60px;
  border-radius: 5px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #dbcd13;
  }
`;

const Search = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;

  .input-contianer {
    display: flex;
    flex-direction: row;
    margin: 20px;
  }
  .input-contianer input {
    border-radius: 20px;
    width: 300px;
    height: 40px;
  }

  button {
    height: 40px;
    padding: 2px 10px 5px 10px;
    background: orange;
    display: flex;
    align-items: center;

    font-size: 30px;
    border-radius: 20px;
  }
`;

const Notice = styled(MovieTempalte)`
  display: flex;
  justify-content: center;
  align-content: center;
`;
