const mongoose = require('mongoose');

mongoose.connect(`mongodb://0.0.0.0:27017/Hospital_api`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the db'));

db.once('open', function () {
  console.log("Successfully connected to the Database");
});

module.exports = db;
