const express = require("express");
const employeeModel = require("../models/employee");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { default: mongoose } = require("mongoose");
const upload = multer({ dest: "uploads/" });
router.post("/save-member", upload.single("picture"), uploadFiles);

async function uploadFiles(req, res) {
  const employee = new employeeModel(req.body);
  const pictureUrl = path.resolve(
    __dirname + "/../uploads/" + req.file.filename + ".jpg"
  );
  employee.picture = pictureUrl;
  console.log(employee.picture);

  try {
    const savedUser = await employee.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
}
router.get("/fetch-users", async (req, res) => {
  const users = await employeeModel.find();
  try {
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
