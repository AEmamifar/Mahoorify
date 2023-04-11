import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUser";
import NewReleaseCard from "./NewRelaseCard";
import Mahoorify from "../assets/Mahoorify.jpg";
import styled from "styled-components";
const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    fetch("/api/get-liked-song")
      .then((res) => res.json())
      .then((data) => {
        setPlayList(data.data);
      });
  }, []);
  return (
    <>
      <div>
        {currentUser.display_name && (
          <StyledUser>
            <p> Welcome {currentUser.display_name}</p>
            <img
              src={
                currentUser.images.length
                  ? currentUser.images[0].url
                  : Mahoorify
              }
            />
          </StyledUser>
        )}

        <StyledPlayList>
          <h3>{currentUser.display_name}' s Liked Songs</h3>
          <StyledSongs>
            {playList.find((song) => song.userId === currentUser._id) ? (
              playList.map((song) => {
                return (
                  <NewReleaseCard
                    key={song.songId}
                    image={song.images[0].url}
                    artists={
                      Array.isArray(song.artists)
                        ? song.artists[0].name
                        : song.artists
                    }
                    id={song.songId}
                  />
                );
              })
            ) : (
              <h2>There are no songs liked yet!</h2>
            )}
          </StyledSongs>
        </StyledPlayList>
      </div>
    </>
  );
};

const StyledSongs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 20px;
    color: white;
  }
`;
const StyledPlayList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: 0rem auto;
  padding: 20px;
  margin-bottom: 10rem;
`;

const StyledUser = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  margin: 0rem auto;
  padding: 20px;
  p {
    color: white;
    font-size: 20px;
    margin-right: 10px;
  }
  img {
    width: 200px;
    border-radius: 50%;
  }
`;

export default Profile;
