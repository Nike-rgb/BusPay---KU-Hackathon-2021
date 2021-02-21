const socket = require('socket.io');

module.exports = function (server, eventEmitter) {
    const io = socket(server);

    eventEmitter.on('deduct', deductedAmt => {
        io.emit('deduct', deductedAmt);
    });

    //socket initialization
    io.on('connection', socket => {
        socket.on('join', id => {
            socket.join(id);
        });
    });
}