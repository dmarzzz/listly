const mongoose = require('mongoose');
const config = require('../config');

async function mongooseLoader(){
    console.log("loading mongoose");
    mongoose.connect(config.databaseURI, { useNewUrlParser: true,  useUnifiedTopology: true }, function(err) {
        if (err) {
          throw err;
        } else {
          console.log(`Successfully connected to ${config.databaseURI}`);
        }
      });

}

module.exports = mongooseLoader;