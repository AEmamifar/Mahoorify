import styled from "styled-components";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";

import Home from "./Home";
import ReleaseDetails from "./ReleaseDetails";

const App = () => {
  const [token, setToken] = useState("");

  const [newRelase, setNewRelease] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    console.log("url", url);
    const data = new URL(url);
    console.log("data", data);
    const accessToken = data.href.includes("#")
      ? data.href.split("#")[1].split("=")[1].split("&")[0]
      : "";
    console.log("accessToken", accessToken);
    setToken(accessToken);
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header
        setToken={setToken}
        token={token}
        setNewRelease={setNewRelease}
        setGenre={setGenre}
      />
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                token={token}
                newRelase={newRelase}
                setNewRelease={setNewRelease}
                genre={genre}
                setGenre={setGenre}
              />
            }
          />

          <Route
            path="new-release/:id"
            element={<ReleaseDetails token={token} newRelase={newRelase} />}
          />

          <Route path="" element={<h1>404: Oops!</h1>} />
        </Routes>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
`;

export default App;
