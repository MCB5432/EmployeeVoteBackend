const express = require("express");
const employeeModel = require("../models/employee");
const router = express.Router();

router.post("/create", async (req, res) => {
  const employee = new employeeModel({
    name: req.body.name,
    surname: req.body.surname,
    position: req.body.position,
    gender: req.body.gender,
    picture: req.body.picture,
    point: req.body.point,
    email: req.body.email,
    phone: req.body.phone,
  });
  try {
    const savedUser = await employee.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
