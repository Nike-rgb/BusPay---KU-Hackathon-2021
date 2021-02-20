const User = require('../../models/user.js');

module.exports = function(app) {

    app.get('/', (req, res) => {
        const id = (req.session)? req.session.userId : undefined;
        User.findOne({_id : id}, (err, user) => {
            if(err) {
                //handle error
                throw err;
            }
            if(!user) return res.render('index');
            res.render('index', {
                id,
                balance : user.balance,
                username : user.username,
            });
        });  
    });

    app.post('/newUser', (req, res) => {
        let {username} = req.body;
        new User({
            username,
        }).save((err, user) => {
            req.session.userId = user._id; //temp
            res.json({
                id : user._id,
            });
        });
    });

    app.post('/topUp', (req, res) => {
        let {topUpAmt} = req.body;
        let userId = req.session.userId;
        User.findOne({_id : userId}, (err, user) => {
            if(err) {
                //handle error
                throw err
            }
            user.balance += topUpAmt;
            user.save((err, user) => {
                res.json({
                    newBalance : user.balance,
                });
            });
        });
    });

    app.get('/getQR', (req, res) => {
        let userId = req.session.userId;
        User.findOne({_id : userId}, (err, user) => {
            if(err) {
                //handle error
                throw err;
            }
            res.json({
                id : userId,
                username : user.username,
                balance : user.balance,
            });
        });
    });

}

