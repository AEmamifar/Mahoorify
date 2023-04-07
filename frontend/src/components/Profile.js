import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUser";
import NewReleaseCard from "./NewRelaseCard";
import Mahoorify from "../assets/Mahoorify.jpg";
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
          <div>
            <p>{currentUser.display_name}</p>
            <img
              src={
                currentUser.images.length
                  ? currentUser.images[0].url
                  : Mahoorify
              }
            />
          </div>
        )}

        <div>
          {playList.map((song) => {
            return (
              <NewReleaseCard
                key={song.songId}
                image={song.images[0].url}
                artists={song.artists[0].name}
                id={song.songId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
