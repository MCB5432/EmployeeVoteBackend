const express = require("express");
const path = require("path");
const employeeModel = require("../models/employee");
const eventModel = require("../models/event");
const router = express.Router();
const multer = require("multer");
const { default: mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./pics");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "--" + file.originalname);
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
    const user = await employeeModel.findByIdAndUpdate(req.params.id, {
      point: req.body.point,
    });
    res.send({ message: "Update success" });
  } catch (error) {
    res.send(error);
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

module.exports = router;
