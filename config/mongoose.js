const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://rs188162:Rachit123@cluster0.jvqijcl.mongodb.net/`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the db'));

db.once('open', function () {
  console.log("Successfully connected to the Database");
});

module.exports = db;
