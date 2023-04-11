import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";

import Home from "./Home";
import ReleaseDetails from "./ReleaseDetails";
import Profile from "./Profile";

const App = () => {
  return (
    <StyledMainDiv>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new-release/:id" element={<ReleaseDetails />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="" element={<h1>404: Oops!</h1>} />
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    </StyledMainDiv>
  );
};

const StyledMainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;
const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default App;
