import { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUser";
import Mahoorify from "../assets/Mahoorify.jpg";

const Header = () => {
  const { currentUser, token, setToken, setNewRelease, setGenre } =
    useContext(CurrentUserContext);
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
      <img src={Mahoorify} />

      <form onSubmit={SubmitHanlder}>
        <input
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button>Search</button>
      </form>

      {currentUser && token && (
        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </button>
      )}
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
  padding: 20px;
  position: sticky;
  top: 0;
  img {
    width: 80px;
    border-radius: 50%;
  }
  input {
    padding: 4px 30px;
    margin-right: 5px;
  }
  a,
  button,
  Link {
    color: white;
    padding: 10px 15px;

    border: 2px solid black;
    background: none;
    text-decoration: none;
    border-radius: 10px;
    background: black;
    &:hover {
      cursor: pointer;
      color: black;
      background: white;
      transition: 0.5s ease-in-out all;
    }
  }
`;

export default Header;
