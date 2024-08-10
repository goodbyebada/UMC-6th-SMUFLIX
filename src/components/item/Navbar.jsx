import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { removeToken } from "custom/token";
import { isTokenStored } from "custom/token";

export default function Navbar({ setIsLoggedIn }) {
  const navItems = [
    {
      to: isTokenStored() ? "" : "/login",
      text: isTokenStored() ? "로그아웃" : "로그인",
      click: () => {
        if (isTokenStored()) {
          removeToken();
          setIsLoggedIn(false);
        }
      },
    },
    {
      to: "/signup",
      text: "회원가입",
      click: () => {},
    },
    {
      to: "/popular",
      text: "Popular",
      click: () => {
        console.log("nothing");
      },
    },
    { to: "/nowPlaying", text: "Now Playing", click: () => {} },
    { to: "/topRated", text: "Top Rated", click: () => {} },
    { to: "/upcoming", text: "Upcoming", click: () => {} },
  ];

  return (
    <Nav height="50px">
      <Link to={"/"}>
        <p>UMC Movie</p>
      </Link>

      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <StyledLink onClick={item.click} to={item.to}>
              {item.text}
            </StyledLink>
          </li>
        ))}
      </ul>
      <BuggerBtn>
        <span></span>
      </BuggerBtn>
    </Nav>
  );
}

const Nav = styled.nav`
  height: ${(props) => props.height};
  color: white;
  background-color: rgb(6, 6, 73);
  display: flex;
  flex-direction: row;

  a {
    text-decoration-line: none;
    color: white;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  box-sizing: border-box;
  display: inline;
  padding: 4px 8px;
  margin: 0 auto;
  color: white;
  text-decoration-line: none;

  &:hover {
    color: yellow;
    font-size: large;
    transition: 0.5s;
    caret-color: black; /* 포인터 색상을 검정색으로 변경 */
  }
`;
//따로 useState로 감지할 필요없어서  편하다..

const BuggerBtn = styled.a`
  position: relative;
  display: none;
  width: 20px;
  margin-right: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;

    span,
    span:before,
    span:after {
      display: block;
    }
  }

  span,
  span:before,
  span:after {
    display: none;
    position: absolute;
    left: 0;
    width: 100%;
    height: 5px;
    background: #f6f6f6ce;
    transition: all 0.3s;
    border-radius: 10px;
  }

  span {
    top: 50%;
    transform: translateY(-50%, -50%);
  }

  span:before,
  span:after {
    content: "";
  }
  span:before {
    top: -10px;
  }
  span:after {
    top: 10px;
  }
  /*hover*/
  &:hover > span {
    background: transparent;
  }
  &:hover > span:before {
    top: 0;
    transform: rotate(45deg);
  }
  &:hover > span:after {
    top: 0;
    transform: rotate(-45deg);
  }
`;
