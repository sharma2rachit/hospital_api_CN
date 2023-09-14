//importing express
const express = require('express');

//creating router for routing
const router = express.Router();

//importing passport for authentiacted routing
const passport = require('passport');

//controllers
const status= require('../controllers/status')


//router middlewares
router.use('/doctors', require('./doctors'))
router.use('/patients', require('./patients'))

//router for reports
router.get('/reports/:status',passport.authenticate('jwt',{session:false}),status.filteredReports)


module.exports = router;