'use strict';

require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./app/routes/index');
var app = express();

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';


mongoose.connect(uristring);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('[image-searcher] connected to databse! Now starting server');
    app.use(express.static(process.cwd() + '/public'));
    
    routes(app);

    var port = process.env.PORT || 3000;
    app.listen( port, function () {
        console.log('[image-searcher] Node.js listening on port ' + port + '...');
    });
});

