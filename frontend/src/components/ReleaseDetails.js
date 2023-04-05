import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyPlayer from "react-spotify-player";

const ReleaseDetails = ({ newRelase, token }) => {
  const params = useParams();
  // size may also be a plain string using the presets 'large' or 'compact'
  const size = {
    width: "100%",
    height: 300,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  return (
    <>
      <div>
        {newRelase.map((release) => {
          if (release.id === params.id) {
            console.log("release", release);
            return (
              <div>
                <p>{release.artists[0].name}</p>
                <img src={release.images[0].url} />
                <SpotifyPlayer
                  uri={release.uri}
                  size={size}
                  view={view}
                  theme={theme}
                />
                ;
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ReleaseDetails;
