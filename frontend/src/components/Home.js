import { useState, useEffect } from "react";
import styled from "styled-components";
import NewReleaseCard from "./NewRelaseCard";
import GenreButton from "./GenreButton";

const Home = ({ token, newRelase, setNewRelease, genre, setGenre }) => {
  console.log("newRelase", newRelase);
  console.log("genre", genre);

  useEffect(() => {
    if (token) {
      // fetch("https://api.spotify.com/v1/me", {
      //   headers: { Authorization: `Bearer ${token}` },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("user", data);
      //   });
      fetch(`/api/get-newRelease?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          setNewRelease(data.data.albums.items);
          console.log("new releases", data);
        });
      fetch(`/api/genre?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          setGenre(
            data.data.genres.sort(() => 0.5 - Math.random()).slice(0, 10)
          );
        });
    }
  }, [token]);

  return (
    <>
      <StyledNewReleases>
        {newRelase.map((item) => {
          return (
            <NewReleaseCard
              key={item.id}
              album_type={item.album_type}
              artists={item.artists[0].name}
              image={item.images[0].url}
              id={item.id}
            />
          );
        })}
      </StyledNewReleases>
      <StyledGenre>
        {genre.map((item) => {
          return <GenreButton key={item} genre={item} />;
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
