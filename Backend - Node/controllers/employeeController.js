const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find((err, docs) => {

        if(!err){ 
            res.send(docs); 
        }
        else{
            console.log('Error in Retrieving Employees : ' + JSON.stringify(err, undefined, 2))
        }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record of the given id : ${ req.param.id }`);
    }
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retrieving Employee : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        dept: req.body.dept,
        position: req.body.position,
        score: req.body.score,
        remarks: req.body.remarks
    });
    emp.save((err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Cannot save Employee : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${ req.params.id }`);
    }

    var emp = {
        name: req.body.name,
        dept: req.body.dept,
        position: req.body.position,
        score: req.body.score,
        remarks: req.body.remarks
    };

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Cannot update employee id : ${req.params.id}` + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Cannot delete employee id : ${req.params.id}` + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;