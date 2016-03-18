//Module to deal with sockets.
module.exports = function(sockets){
    sockets.set('transports', [
        'websocket',
        'polling',
        'xhr-polling'
    ]);

    sockets.on('connection', function(socket){
        //console.log(socket.id);
        //console.log();
        socket.on('custom_event', function(data, cb){
            console.log('data', data);
            socket.to().broadcast.emit('custom_response', data);
            cb(123);
        });
    });
};