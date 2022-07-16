const express = require("express");
const path = require("path");
const employeeModel = require("../models/employee");
const adminModel = require("../models/admin");
const eventModel = require("../models/event");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: "./pics/",
  filename: function (req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/save-member", upload.single("picture"), uploadFiles);

async function uploadFiles(req, res) {
  const employee = new employeeModel(req.body);
  employee.picture = path.resolve(__dirname + "/../pics/" + req.file.filename);
  try {
    const savedUser = await employee.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
}
router.get("/get-members", async (req, res) => {
  const users = await employeeModel.find();
  try {
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});
router.get("/get-image/:id", async (req, res) => {
  const user = await employeeModel.findById(req.params.id);

  try {
    res.sendFile(user.picture);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/update-user/:id", async (req, res) => {
  try {
    const user = await employeeModel.findByIdAndUpdate(
      req.params.id,
      {
        point: req.body.point,
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await employeeModel.findByIdAndDelete(req.params.id);
    res.send("User deleted!");
  } catch (err) {
    res.send(err);
  }
});
router.post("/event-log", async (req, res) => {
  const event = new eventModel(req.body);
  try {
    const savedEvent = await event.save();
    res.send({ event: savedEvent, message: "Event log created" });
  } catch (error) {
    res.send(error);
  }
});
router.get("/event-log", async (req, res) => {
  const events = await eventModel.find();
  try {
    res.send(events);
  } catch (error) {
    res.send(error);
  }
});
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await adminModel.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await adminModel.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await adminModel.findOne({ username });

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      res.status(400).send("Invalid Credentials");
    }
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/verify", auth, (req, res) => {
  console.log(req);
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
