const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String},
    dept: { type: String},
    position: { type: String},
    score: { type: Number},
    remarks: { type: String }
}, 'emp');

module.exports = { Employee };