const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");
require("dotenv").config();

const url = process.env.DBSTRING;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Conneced");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.get("/", (req, res) => {
  res.json({ message: "Employee Vote APP started" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
