import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpotifyPlayer from "react-spotify-player";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CurrentUserContext } from "./CurrentUser";

const ReleaseDetails = () => {
  const { currentUser, newRelase } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const params = useParams();
  // size may also be a plain string using the presets 'large' or 'compact'
  const size = {
    width: "100%",
    height: 300,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  useEffect(() => {
    fetch("/api/get-liked-song")
      .then((res) => res.json())
      .then((data) => {
        data.data.forEach((item) => {
          if (item.userId === currentUser._id && item.songId === params.id) {
            setIsLiked(true);
          }
        });
      });

    fetch("/api/get-comments")
      .then((res) => res.json())
      .then((data) => {
        setAllComments(data.data);
      });
  }, [isLiked, newComment, currentUser]);

  const handleLike = (release) => {
    if (isLiked) {
      fetch(
        `/api/delete-liked-song?userId=${currentUser._id}&songId=${release.id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            setIsLiked(false);
          }
        });
    } else {
      fetch("/api/add-user-song", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artists: release.artists,
          images: release.images,
          uri: release.uri,
          userId: currentUser._id,
          songId: release.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setIsLiked(true);
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/add-comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        songId: params.id,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComment("");
        setNewComment(!newComment);
      });
  };

  const hanldeDelete = (_id) => {
    fetch(
      `/api/delete-comment?userId=${currentUser._id}&songId=${params.id}&_id=${_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setNewComment(!newComment);
      });
  };

  const hanldeEdit = (e, _id) => {
    e.preventDefault();
    fetch("/api/update-comment", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        songId: params.id,
        userId: currentUser._id,
        comment: updatedComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNewComment(!newComment);
          setIsOpen(false);
        }
      });
  };

  return (
    <>
      <div>
        {newRelase.map((release) => {
          if (release.id === params.id) {
            return (
              <div key={release._id}>
                <p>
                  {release.artists ? release.artists[0].name : release.name}
                </p>
                <img src={release.images.length ? release.images[0].url : ""} />
                <SpotifyPlayer
                  uri={release.uri}
                  size={size}
                  view={view}
                  theme={theme}
                />
                <div>
                  <button
                    onClick={() => {
                      handleLike(release);
                    }}
                  >
                    {isLiked ? (
                      <AiFillHeart style={{ color: "red" }} />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                  <form onSubmit={handleSubmit}>
                    <input
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button>Comment</button>
                  </form>
                </div>

                <div>
                  <h2>Comments</h2>
                  <div>
                    {allComments &&
                      allComments.map((item) => {
                        if (item.songId === params.id) {
                          return (
                            <div key={item._id}>
                              <p>{item.comment}</p>
                              {isOpen && (
                                <form
                                  onSubmit={(e) => {
                                    hanldeEdit(e, item._id);
                                  }}
                                >
                                  <input
                                    onChange={(e) => {
                                      setUpdatedComment(e.target.value);
                                    }}
                                  />
                                  <button>Save</button>
                                </form>
                              )}

                              <span>
                                <button
                                  onClick={() => {
                                    hanldeDelete(item._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    setIsOpen(!isOpen);
                                  }}
                                >
                                  Edit
                                </button>
                              </span>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ReleaseDetails;
