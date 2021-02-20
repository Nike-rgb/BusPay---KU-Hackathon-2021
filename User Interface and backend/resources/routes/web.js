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
}

