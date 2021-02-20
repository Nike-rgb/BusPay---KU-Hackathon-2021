const mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
    username : String,
    balance : {type : Number, default : 0},
}));

