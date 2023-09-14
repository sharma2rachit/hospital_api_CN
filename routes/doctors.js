//importing express 
const express = require('express');

//importing router for routing
const router = express.Router();

//controllers 
const doctor = require('../controllers/doctorController')

//routes to different pages
router.post('/register',doctor.create)
router.post('/login',doctor.createSession)

module.exports = router;