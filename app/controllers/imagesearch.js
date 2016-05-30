'use strict';
var request = require('superagent');
var Query = require('../models/query');
var filterGoogleResponse = require('../utils/filterGoogleResponse');


module.exports = function Imagesearch(){

    this.search = function(req, res) {
        var searchString = req.params.searchString;
        var offset = Number(req.query.offset) || 1;
        var start = offset+1;

        var api_response = function(err, data){
            res.send(filterGoogleResponse(data.body || {}));
        };

        request
            .get('https://www.googleapis.com/customsearch/v1?key=' + process.env.GSE_KEY + '&cx=' + process.env.GSE_ID)
            .query({searchType: 'image'})
            .query({start: start})
            .query({q: searchString})
            .end(api_response);


        var query = new Query ({
            term: searchString,
            offset: offset,
            when: Date()
        });

        query.save(function(err, query){
            if (err) return console.error(err);
            console.log('[image-searcher] saved query to database');
        });
    };

    this.getLatest = function(req, res){
        var q = Query.find({},{_id:0, term: 1, offset: 1, when: 1}).sort({when: -1}).limit(10);
        q.exec(function(err, queries){
            res.send(queries);
        });
    };
};