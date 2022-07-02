const express = require("express");
const path = require('path');
const employeeModel = require("../models/employee");
const router = express.Router();
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const upload = multer({ dest: "uploads/" });


router.post("/save-member", upload.single("picture"), uploadFiles);

router.get('/someImageUrlOnlyForAuthorizedUsers', function(req,res){
  res.sendFile(path.resolve(__dirname + '/../uploads/4f7176168fb0e49144443d87ee721796.jpg'));

});

async function uploadFiles(req, res) {
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
