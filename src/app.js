const express = require("express");
const axios = require("axios");
const redis = require("redis");
const responstTime = require("response-time");
const { promisify } = require("util");

const app = express();

const PORT = process.env.PORT || 3000;

/* RESPONSE TIME MIDDLEWARE
Adds a header in the response object
that indicates how long it took for
the request to be processed
*/
app.use(responstTime());

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

client.connect();

app.get("/rockets", async (req, res, next) => {
  try {
    const cacheReply = await client.get("rockets");

    if (cacheReply) {
      console.log("Using cached data");
      return res.send(JSON.parse(cacheReply));
    }
    const response = await axios.get(`https://api.spacexdata.com/v3/rockets`);

    const saveResult = await client.set(
      "rockets",
      JSON.stringify(response.data),
      {
        EX: 15,
      }
    );

    console.log("New data cached", saveResult);

    return res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/rockets/:rocker_id", async (req, res, next) => {
  try {
    const { rocker_id } = req.params;
    const cacheReply = await client.get(rocker_id );

    if (cacheReply) {
      console.log("Using cached data");
      return res.send(JSON.parse(cacheReply));
    }
    const response = await axios.get(
      `https://api.spacexdata.com/v3/rockets/${rocker_id}`
    );

    const saveResult = await client.set(
      rocker_id,
      JSON.stringify(response.data),
      {
        EX: 15,
      }
    );

    console.log("New data cached", saveResult);

    return res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () =>
  console.log(`Server up and listening on http://localhost/${PORT}`)
);
