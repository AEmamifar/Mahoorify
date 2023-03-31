import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

const Header = ({ setToken, token }) => {
  const logout = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
  };

  const CLIENT_ID = "e706776da93b4a3aa0a004534ae4791c";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <Logo alt="Slingshot Airlines Logo" />
        </Link>
      </Container>
      <Nav>
        <>
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          )}
        </>
      </Nav>
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  padding: 5px;
  margin-left: 25px;
  margin-top: 10px;
  border-radius: 3px;
  font-size: 18px;
  font-family: var(--font-heading);
  font-weight: bold;
  border: solid 3px black;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-alabama-crimson);
  height: 150px;
  padding: var(--padding-page) 18px;
`;
const Logo = styled.img`
  height: 60px;
  width: 550px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
