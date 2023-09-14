//importing express for the main index file
const express = require('express');

//creating express app
const app = express();

//creating manual port for the app to run
const port = 8000;


//importing database 
const db = require('./config/mongoose')

//Used for Session Cookie
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy')

// url encoded to parse incomming url to run on internet
app.use(express.urlencoded({ extended: true }))


//initializing passport
app.use(passport.initialize());

// Use express router
app.use('/', require('./routes/index'))


//creating sevrer using app.listen()
app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the Server. Error is : ${error}`);
        return;
    }
    console.log(`Server is up and running on the port: ${port}`);
})
