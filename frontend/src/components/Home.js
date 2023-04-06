import { useState, useEffect } from "react";
import styled from "styled-components";
import NewReleaseCard from "./NewRelaseCard";
import GenreButton from "./GenreButton";

const Home = ({ token, newRelase, setNewRelease, genre, setGenre }) => {
  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((user) => {
          fetch("/api/add-user", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: user.id,
              images: user.images,
              display_name: user.display_name,
            }),
          });
        });

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
              album_type={item.album_type ? item.album_type : item.type}
              artists={item.artists ? item.artists[0].name : item.name}
              image={item.images.length ? item.images[0].url : ""}
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
