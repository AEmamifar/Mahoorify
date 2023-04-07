import { useContext } from "react";
import styled from "styled-components";
import NewReleaseCard from "./NewRelaseCard";
import GenreButton from "./GenreButton";
import { CurrentUserContext } from "./CurrentUser";
import Mahoorify from "../assets/Mahoorify.jpg";
const Home = () => {
  const { token, newRelase, setNewRelease, genre } =
    useContext(CurrentUserContext);

  return (
    <>
      <StyledNewReleases>
        {newRelase.map((item) => {
          return (
            <NewReleaseCard
              key={item.id}
              album_type={item.album_type ? item.album_type : item.type}
              artists={item.artists ? item.artists[0].name : item.name}
              image={item.images.length ? item.images[0].url : Mahoorify}
              id={item.id}
            />
          );
        })}
      </StyledNewReleases>
      <StyledGenre>
        {genre.map((item) => {
          return (
            <GenreButton
              key={item}
              genre={item}
              setNewRelease={setNewRelease}
              token={token}
            />
          );
        })}
      </StyledGenre>
    </>
  );
};

const StyledNewReleases = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledGenre = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;

export default Home;
