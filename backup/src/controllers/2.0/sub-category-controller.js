const uuid = require('uuid');
const model = require('../../models/2.0/system/sub_category');
const controller = {};

controller.create = (req,res) => {
    if(!req.body.data){
        res.status(400).send();
        return;
    }

    model.create({
        id: uuid.v4(),
        ...req.body.data
    })
    .then(result=>{
        res.send(result);
        return;
    },error=>{
        res.send({error});
        return;
    })

}


module.exports = controller;