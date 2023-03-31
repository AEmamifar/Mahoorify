import { useState, useEffect } from "react";

const Landing = () => {
  const CLIENT_ID = "e706776da93b4a3aa0a004534ae4791c";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [userInput, setUserInput] = useState("");

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

  //"http://localhost:3000/#access_token=BQDeE7JG9Fscp7rDBbZO9nomkodzmLB-iLAq5qUz0j_MwT18vWPd9NJa7XGWEiHZ3aBG_i-YKpBM_Tom_F_ynp9lrrAgF2W29O4zx73yatGV2yrt_k8xuJlb3pSIm_GlvWo30HcxlpCofIUCEwZMn9f5fRO4xwcaNzPeAGN5LcnfDsYM6BwMoOIVoL_yp2xUCYeV&token_type=Bearer&expires_in=3600"

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   let token = window.sessionStorage.getItem("token");

  //   if (!token && hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((elem) => elem.startsWith("access_token"))
  //       .split("=")[1];

  //     window.location.hash = "";
  //     window.sessionStorage.setItem("token", token);
  //   }

  //   setToken(token);
  // }, []);

  const logout = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("user", data);
        });
      fetch(
        "https://api.spotify.com/v1/browse/new-releases?country=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("new releases", data);
        });
    }
  }, [token]);
  const SubmitHanlder = (e) => {
    e.preventDefault();
    fetch(`https:///api.spotify.com/v1/search?q=${userInput}&type=artist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      });
  };

  return (
    <>
      <div>Home Landing</div>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      )}

      <form onSubmit={SubmitHanlder}>
        <input
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
    </>
  );
};

export default Landing;
