"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
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
        q: `${search}`,
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
const getCurrentUser = async (req, res) => {
  //try {
  var options = {
    uri: `https://api.spotify.com/v1/me"`,
    headers: {
      Authorization: `Bearer ${req.query.token}`,
    },
    json: true,
  };

  const data = await request(options);
  console.log("here");
  console.log(data);

  //res.status(200).json({ status: 200, data: data });
  // } catch (err) {
  //   res
  //     .status(400)
  //     .json({ status: 400, message: "Error in getting current user " });
  // }
};

module.exports = {
  getNewReleasze,
  getSearchResults,
  getCurrentUser,
};
