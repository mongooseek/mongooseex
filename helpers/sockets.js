//Module to deal with sockets.
module.exports = function (sockets) {
    sockets.set('transports', [
        'websocket',
        'polling',
        'xhr-polling'
    ]);

    sockets.on('connection', function (socket) {
        socket.on('start', function (_id) {
            global.connectedPeople[_id] = socket.id;
        });
        socket.on('custom_event', function (message, cb) {
            console.log('REPLICA', message.replica);
            socket.broadcast.to(global.connectedPeople[message._id]).emit('custom_response', message.replica);
            cb(123);
        })
    });
};