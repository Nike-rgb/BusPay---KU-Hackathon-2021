require('dotenv').config();
module.exports = function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin' : process.env.CONDUCTOR_APP_BASE_URL,
        'Access-Control-Allow-Headers' : 'content-type',
        'X-powered-by' : 'Noone',
    });
    next();
}