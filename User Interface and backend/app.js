require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const socket = require('socket.io');

//setting up the server
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);
console.log('App running on port ' + PORT);

//setting up the database
require('./config/db.js')();

//setting up the session
app.use(session({
    secret : process.env.secret,
    saveUninitialized : true,
    resave : false,
    store : new MongoStore({
        collection : "UserSessions",
        mongooseConnection : mongoose.connection,
    }),
    cookie : {
        maxAge : 1000 * 60 * 60 * 60 * 2, //2 hours
        httpOnly : true,
        sameSite : true,
    }
}));

//setting up cors config
app.use(require('./config/cors.js'));

//setting up the views
app.set('views', './resources/views');
app.set('view engine', 'ejs');

//serving static assets
app.use(express.static('./public'));

//configuring the event emitter
const Emitter = require('events');
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

//setting up the server socket
require('./controllers/socketController')(server, eventEmitter);

//setting up the routes
require('./resources/routes/web')(app);

