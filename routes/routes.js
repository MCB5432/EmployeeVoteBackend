const express = require("express");
const path = require("path");
const employeeModel = require("../models/employee");
const eventModel = require("../models/event");
const router = express.Router();
const { default: mongoose } = require("mongoose");

router.post("/save-member",async (req,res) => {
  const employee = new employeeModel(req.body);
  try {
    const savedUser = await employee.save();
    console.log(savedUser);
    res.send(savedUser);
  } catch (error) {
    res.send(error);
  }
});


router.get("/get-members", async (req, res) => {
  const users = await employeeModel.find();
  try {
    res.send(users);
  } catch (error) {
    console.log(error);
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
    res.send({ message: "Update success", user: user });
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
