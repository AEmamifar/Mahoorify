"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// returns an array of all flight numbers
const getFlights = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const flights = await db.collection("flights").find().toArray();

    const flightNames = flights.map((flight) => flight._id);
    res.status(200).json({ status: 200, data: flightNames });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Error in getting flights" });
  }
};

// returns all the seats on a specified flight
const getFlight = async (req, res) => {
  try {
    const { flight } = req.params;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const flightData = await db.collection("flights").findOne({ _id: flight });

    res.status(200).json({ status: 200, data: flightData.seats });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in getting flight seats" });
  }
};

// returns all reservations
const getReservations = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const reservations = await db.collection("reservations").find().toArray();

    res.status(200).json({ status: 200, data: reservations });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in getting reservations" });
  }
};

// returns a single reservation
const getSingleReservation = async (req, res) => {
  try {
    const { reservation } = req.params;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const reservationData = await db
      .collection("reservations")
      .findOne({ _id: reservation });

    res.status(200).json({ status: 200, data: reservationData });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in getting reservationData" });
  }
};

// creates a new reservation
const addReservation = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");

    console.log(req.body);
    const flightData = await db
      .collection("flights")
      .findOne({ _id: req.body.flight });

    flightData.seats.forEach((seat) => {
      if (seat.id === req.body.seat) {
        seat.isAvailable = false;
      }
    });

    const newSeats = { $set: { seats: flightData.seats } };

    await db
      .collection("flights")
      .updateOne({ _id: req.body.flight }, newSeats);

    const { email, firstName, lastName, seat, flight } = req.body;
    const reservationObject = {
      _id: uuidv4(),
      email,
      givenName: firstName,
      surname: lastName,
      seat,
      flight,
    };
    await db.collection("reservations").insertOne(reservationObject);

    res.status(200).json({ status: 200, data: reservationObject });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in making reservation" });
  }
};

// updates a specified reservation
const updateReservation = async (req, res) => {
  try {
    const { reservation } = req.params;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const oldReservation = await db
      .collection("reservations")
      .findOne({ _id: reservation });

    const flightData = await db
      .collection("flights")
      .findOne({ _id: oldReservation.flight });

    flightData.seats.forEach((seat) => {
      if (seat.isAvailable && seat.id === req.body.seat) {
        seat.isAvailable = false;
      }
      if (seat.id === oldReservation.seat) {
        seat.isAvailable = true;
      }
    });

    const newSeats = { $set: { seats: flightData.seats } };

    await db
      .collection("flights")
      .updateOne({ _id: oldReservation.flight }, newSeats);

    const reservationObject = {
      givenName: req.body.firstName
        ? req.body.firstName
        : oldReservation.givenName,
      surname: req.body.lastName ? req.body.lastName : oldReservation.surname,
      seat: req.body.seat ? req.body.seat : oldReservation.seat,
      email: req.body.email ? req.body.email : oldReservation.email,
      flight: oldReservation.flight,
    };

    await db
      .collection("reservations")
      .updateOne({ _id: reservation }, { $set: reservationObject });

    res.status(200).json({ status: 200, data: reservationObject });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Error in getting updating" });
  }
};

// deletes a specified reservation
const deleteReservation = async (req, res) => {
  try {
    const { reservation } = req.params;
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    const oldReservation = await db
      .collection("reservations")
      .findOne({ _id: reservation });

    const flightData = await db
      .collection("flights")
      .findOne({ _id: oldReservation.flight });

    flightData.seats.forEach((seat) => {
      if (seat.id === oldReservation.seat) {
        seat.isAvailable = true;
      }
    });

    const newSeats = { $set: { seats: flightData.seats } };

    await db
      .collection("flights")
      .updateOne({ _id: oldReservation.flight }, newSeats);

    await db.collection("reservations").deleteOne({ _id: oldReservation._id });

    res.status(200).json({ status: 200, message: "reservation deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: "Error in deleting reservation" });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
