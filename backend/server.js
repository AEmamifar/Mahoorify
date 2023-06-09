"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  getNewReleasze,
  getSearchResults,
  getGenre,
  addUser,
  handleAddSong,
  getLikedSong,
  deleteLikedSong,
  addComment,
  getAllComments,
  deleteComment,
  updateHandler,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above or below this line
  // ---------------------------------

  .get("/api/get-newRelease", getNewReleasze)
  .get("/api/search/:search", getSearchResults)

  .get("/api/genre", getGenre)
  .post("/api/add-user-song", handleAddSong)
  .get("/api/get-liked-song", getLikedSong)
  .delete("/api/delete-liked-song", deleteLikedSong)
  .post("/api/add-comment", addComment)
  .get("/api/get-comments", getAllComments)
  .delete("/api/delete-comment", deleteComment)
  .patch("/api/update-comment", updateHandler)
  .post("/api/add-user", addUser)

  // ---------------------------------
  // Nothing to modify above or below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
