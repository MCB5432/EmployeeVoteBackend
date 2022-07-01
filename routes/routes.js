const express = require('express');
const employeeModel = require('../models/employee');
const router = express.Router()

router.post('/create', (req,res) => {
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
        employee.save();
        res.status(200).json(employee);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;