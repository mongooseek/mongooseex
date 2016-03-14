module.exports = function(sockets){
    sockets.set('transports', [
        'websocket',
        'polling',
        'xhr-polling'
    ]);

    sockets.on('connection', function(socket){
        //socket.join('myRoom');
        socket.on('custom_event', function(data, cb){
            socket.broadcast.emit('custom_response', data);
            //socket.to('myRoom').emit('custom_response', data);
            cb(123);
        });
    });
};