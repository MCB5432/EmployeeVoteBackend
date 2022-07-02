const express = require("express");
const employeeModel = require("../models/employee");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/save-member", upload.array("picture"), uploadFiles);

async function uploadFiles(req, res) {
  req.body.picture = "/upload/" + req.files[0].originalname;
  console.log(req);
  const employee = new employeeModel(req.body);
  try {
    const savedUser = await employee.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = router;
