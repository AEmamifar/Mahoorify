import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUser";
import NewReleaseCard from "./NewRelaseCard";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [playList, setPlayList] = useState([]);
  console.log("currentUser", currentUser);

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
        <div>
          <p>{currentUser.display_name}</p>
          <img
            src={currentUser.images.length ? currentUser.images[0].url : ""}
          />
        </div>

        <div>
          {playList.map((song) => {
            return (
              <NewReleaseCard
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
