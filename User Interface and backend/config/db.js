require('dotenv').config();
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(process.env.MONGO_DB_URI, {
        useUnifiedTopology : true,
        useNewUrlParser : true,
        useCreateIndex : true,
    }).then(() => {
        console.log('Connection with the database made');
    }).catch(err => {
        throw err;
    });
}