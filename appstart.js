var serve = require('serve');
var opn = require('opn');


var server = serve(__dirname, {
    port: 5000,
    ignore: ['node_modules']
});

opn('http://localhost:5000');