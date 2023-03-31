const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const { flights, reservations } = require("./data.js");

const batchImport = async () => {
  const allFlights = [];
  const flightsNames = Object.keys(flights);
  const seats = Object.values(flights);

  flightsNames.forEach((element, index) => {
    allFlights.push({
      _id: element,
      seats: seats[index],
    });
  });

  try {
    const client = await new MongoClient(MONGO_URI, options);

    // await client.connect();
    // const db = client.db("slingair");
    // await db.collection("flights").insertMany(allFlights);
    await client.connect();
    const db = client.db("slingair");
    await db.collection("reservations").insertMany(reservations);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};
batchImport();
