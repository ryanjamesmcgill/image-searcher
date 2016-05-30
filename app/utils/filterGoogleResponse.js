'use strict';
var _ = require('lodash');

var filterGoogleResponse = function(data){
    var output = [];
    var array = data.items || [];
    _.forEach(array,function(item){
        var obj = {
            url: item.link || "no link found",
            snippet: item.snippet || "no snippet found",
            thumbnail: (item.image || {}).thumbnailLink || "no thumbnail link found",
            context: (item.image || {}).contextLink || "no context link found"
        };
        output.push(obj);
    });

    return output.reverse();
};

module.exports = filterGoogleResponse;
