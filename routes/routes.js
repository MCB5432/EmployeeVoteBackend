const express = require("express");
const employeeModel = require("../models/employee");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

router.post("/image-upload", upload.array("picture"),uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}

module.exports = router;
