import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  console.log(
    `Handling [${event.type}] with data: `,
    JSON.stringify(event.data)
  );

  axios
    .post("http://posts-clusterip-service:4000/events", event)
    .catch((e) => console.log(e.message));
  // axios
  //   .post("http://localhost:4001/events", event)
  //   .catch((e) => console.log(e.message));
  // axios
  //   .post("http://localhost:4002/events", event)
  //   .catch((e) => console.log(e.message));
  // axios
  //   .post("http://localhost:4003/events", event)
  //   .catch((e) => console.log(e.message));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("🚌 Event Bus - Listening on 4005");
});
