const express = require("express");
const path = require('path');
const employeeModel = require("../models/employee");
const router = express.Router();
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pics')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + '--' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post("/save-member", upload.single("picture"), uploadFiles);

async function uploadFiles(req, res) {
  req.body.picture = req.file.filename;
  const employee = new employeeModel(req.body);
  try {
    const savedUser = await employee.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
}
// router.get("/get-members", async (req,res => {
  
      
// }))

module.exports = router;
