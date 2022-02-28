const uuid = require('uuid');
const model = require('../../models/2.0/data/user');
const controller = {};

controller.setUser = (req,res) => {
    model.upsert({
        ...req.body.data
    })
    .then(result=>{
        res.send(result);
        return;
    },
    error=>{
        res.send(error);
        console.log(error)
        return;
    })
}

controller.getUser = (req,res) => {
    model.findOne({
        where:{
            uid:req.params.uid
        }
    })
    .then(result=>{
        res.send(result);
        return;
    },
    error=>{
        res.send(error);
        return;
    })
    
}

module.exports = controller;