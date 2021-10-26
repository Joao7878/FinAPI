const express = require("express");
const app = express();
const router = require("./routes");
app.use(express.json());
app.use(router);
app.listen(3030, () => {
  console.log("Server running on port 3000: http://localhost:3030");
});
