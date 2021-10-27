const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routes");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("ready");
  })
  .catch((err) => {
    console.log("error database");
  });
app.use(express.json());
app.use(router);
app.on("ready", () => {
  app.listen(3030, () => {
    console.log("Server running on port 3000: http://localhost:3030");
  });
});
