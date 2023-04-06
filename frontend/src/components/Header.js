import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = ({ setToken, token, setNewRelease, setGenre }) => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    setToken("");
    navigate("/");
    setNewRelease([]);
    setGenre([]);
    window.sessionStorage.removeItem("token");
  };

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const SubmitHanlder = (e) => {
    e.preventDefault();
    fetch(`/api/search/${userInput}?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        setNewRelease(data.data.artists.items);
        setUserInput("");
      });
  };

  return (
    <Wrapper>
      <Link to="/">Home</Link>

      <form onSubmit={SubmitHanlder}>
        <input
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button>Search</button>
      </form>

      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-alabama-crimson);
  height: 100px;
  padding: var(--padding-page) 18px;
  a {
    color: white;
    padding: 10px 15px;
    &:hover {
      cursor: pointer;
    }
    font-size: 20px;
    text-decoration: none;
    border: 2px solid black;
  }
  button {
    color: white;
    padding: 10px 15px;
    background: none;
    &:hover {
      cursor: pointer;
    }
    font-size: 20px;
    text-decoration: none;
    border: 2px solid black;
  }
`;

const StyledNavLink = styled(NavLink)`
  background: var(--color-selective-yellow);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-alabama-crimson);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
  }
`;

export default Header;
