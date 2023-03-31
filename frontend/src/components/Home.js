import { useState, useEffect } from "react";

const Home = ({ token }) => {
  const [userInput, setUserInput] = useState("");

  // useEffect(() => {
  //   const url = window.location.href;
  //   console.log("url", url);
  //   const data = new URL(url);
  //   console.log("data", data);
  //   const accessToken = data.href.includes("#")
  //     ? data.href.split("#")[1].split("=")[1].split("&")[0]
  //     : "";
  //   console.log("accessToken", accessToken);
  //   setToken(accessToken);
  // }, []);

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
          console.log("new releases", data);
        });
    }
  }, [token]);
  const SubmitHanlder = (e) => {
    e.preventDefault();
    fetch(`/api/search/${userInput}?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
      });
  };

  return (
    <>
      <div>Home Landing</div>

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

export default Home;
