import { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [newRelase, setNewRelease] = useState([]);
  const [genre, setGenre] = useState([]);

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
          setCurrentUser({
            _id: user.id,
            images: user.images,
            display_name: user.display_name,
          });

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

  useEffect(() => {
    const url = window.location.href;

    const data = new URL(url);

    const accessToken = data.href.includes("#")
      ? data.href.split("#")[1].split("=")[1].split("&")[0]
      : "";

    const exitingToken = window.sessionStorage.getItem("token");

    if (!exitingToken) {
      window.sessionStorage.setItem("token", accessToken);
    }
    setToken(
      accessToken ? accessToken : window.sessionStorage.getItem("token")
    );
  }, []);
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        setToken,
        newRelase,
        setNewRelease,
        genre,
        setGenre,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
