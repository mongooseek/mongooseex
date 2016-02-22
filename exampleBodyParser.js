var express = require('express');
var bodyParser = require('body-parser');
var port = 8080;
var app = express();

/*app.use(bodyParser());

 app.get('/', function(){

 });*/
console.dir(app);

app.listen(port, function () {
    console.log('App listening on port ' + port);
});


