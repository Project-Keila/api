import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello world from Keila!");
});

app.listen(5000, () => console.log("Listening on port 5000"));
