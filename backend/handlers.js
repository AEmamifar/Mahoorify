"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient, ObjectId } = require("mongodb");
const request = require("request-promise");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// returns an array of all flight numbers
const getNewReleasze = async (req, res) => {
  try {
    var options = {
      uri: "https://api.spotify.com/v1/browse/new-releases?country=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20",

      headers: {
        Authorization: `Bearer ${req.query.token}`,
      },
      json: true,
    };

    const data = await request(options);

    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in getting new releases" });
  }
};

// returns all the seats on a specified flight
const getSearchResults = async (req, res) => {
  const { search } = req.params;
  try {
    var options = {
      uri: `https://api.spotify.com/v1/search`,
      qs: {
        type: "artist",
        q: `artist:${search}`,
      },
      headers: {
        Authorization: `Bearer ${req.query.token}`,
      },
      json: true,
    };

    const data = await request(options);

    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in getting search results " });
  }
};
const getGenre = async (req, res) => {
  const { search } = req.params;
  try {
    var options = {
      uri: `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      qs: {
        type: "artist",
        q: `${search}`,
      },
      headers: {
        Authorization: `Bearer ${req.query.token}`,
      },
      json: true,
    };

    const data = await request(options);

    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Error in getting genre " });
  }
};

const addUser = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Mahoorify");

    const existingUser = await db
      .collection("users")
      .findOne({ _id: req.body._id });

    if (!existingUser) {
      await db.collection("users").insertOne(req.body);
      return res.status(201).json({ status: 201, message: "user added" });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "user already exists" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "user not added" });
    console.log(err);
  }
};

const handleAddSong = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mahoorify");

    await db.collection("songs").insertOne(req.body);
    return res.status(201).json({ status: 201, message: "song liked" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "couldnt like song" });
    console.log(err);
  }
};
const getLikedSong = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mahoorify");

    const allSongs = await db.collection("songs").find().toArray();
    return res.status(200).json({ status: 200, data: allSongs });
  } catch (err) {
    res.status(400).json({ status: 400, message: "couldnt find liked songs" });
    console.log(err);
  }
};
const deleteLikedSong = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    const { userId, songId } = req.query;
    await client.connect();
    const db = client.db("Mahoorify");

    await db.collection("songs").deleteOne({ userId: userId, songId: songId });
    return res.status(200).json({ status: 200, message: "song unliked" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "couldnt unliked the song" });
    console.log(err);
  }
};
const addComment = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mahoorify");

    const { userId, songId, comment } = req.body;

    await db
      .collection("comments")
      .insertOne({ userId: userId, songId: songId, comment: comment });
    return res.status(200).json({ status: 200, message: "comment added" });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "couldnt add comment to the song" });
    console.log(err);
  }
};
const getAllComments = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mahoorify");

    const allComments = await db.collection("comments").find().toArray();
    return res.status(200).json({ status: 200, data: allComments });
  } catch (err) {
    res.status(400).json({ status: 400, message: "couldnt get all comments " });
    console.log(err);
  }
};
const deleteComment = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  const { userId, songId, _id } = req.query;
  try {
    await client.connect();
    const db = client.db("Mahoorify");

    await db
      .collection("comments")
      .deleteOne({ userId: userId, songId: songId, _id: new ObjectId(_id) });
    return res.status(200).json({ status: 200, message: "comment deleted" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "couldnt get all comments " });
    console.log(err);
  }
};
const updateHandler = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  const { userId, songId, _id, comment } = req.body;
  try {
    await client.connect();
    const db = client.db("Mahoorify");

    await db
      .collection("comments")
      .updateOne(
        { userId: userId, songId: songId, _id: new ObjectId(_id) },
        { $set: { comment: comment } }
      );
    return res.status(200).json({ status: 200, message: "comment updated" });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "couldnt updated the comment" });
    console.log(err);
  }
};

module.exports = {
  getNewReleasze,
  getSearchResults,
  handleAddSong,
  getGenre,
  addUser,
  getLikedSong,
  deleteLikedSong,
  addComment,
  getAllComments,
  deleteComment,
  updateHandler,
};
