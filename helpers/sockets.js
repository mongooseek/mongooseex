//Module to deal with sockets.
module.exports = function(sockets){
    sockets.set('transports', [
        'websocket',
        'polling',
        'xhr-polling'
    ]);

    sockets.on('connection', function(socket){
        socket.on('custom_event', function(data, cb){
            socket.broadcast.emit('custom_response', data);
            cb(123);
        });
    });
};