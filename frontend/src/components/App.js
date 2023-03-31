import styled from "styled-components";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";

import Home from "./Home";

const App = () => {
  const [token, setToken] = useState("");
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
      <Header setToken={setToken} token={token} />
      <Main>
        <Routes>
          <Route path="/" element={<Home token={token} />} />

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
