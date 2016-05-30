'use strict';
var Imagesearch = require('../controllers/imagesearch');

var routes = function(app){

    var imagesearch = new Imagesearch();

    app.route('/')
        .get(function(req, res){
            res.sendFile(process.cwd() + '/index.html');
        });

    app.use(function(req,res,next){
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        next();
    });

    app.route('/api/version')
        .get(function(req, res){
            res.send(JSON.stringify(process.versions));
        });

    app.route('/api/imagesearch/:searchString')
        .get(imagesearch.search);

    app.route('/api/latest/imagesearch')
        .get(imagesearch.getLatest);

    app.use(function(req, res) {
        res.status(404).send("uh-oh! Could not find that path..");
    });
};

module.exports = routes;
