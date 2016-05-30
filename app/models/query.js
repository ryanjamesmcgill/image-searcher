'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Query = new Schema({
    term: String,
    offset: String,
    when: Date
});

module.exports = mongoose.model('Query', Query);