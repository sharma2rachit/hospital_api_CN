//importing express 
const express = require('express');
//creating router for routing
const router = express.Router();
//controller
const patient = require('../controllers/patientController')
//importing passport for authentication
const passport = require('passport');


//routes for different pages
router.post('/register',passport.authenticate('jwt',{session:false}),patient.register)
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patient.createReport)
router.get('/:id/all_reports',passport.authenticate('jwt',{session:false}),patient.patientReports)

module.exports = router;