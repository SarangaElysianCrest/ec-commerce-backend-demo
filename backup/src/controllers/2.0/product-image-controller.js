const uuid = require('uuid');
const model = require('../../models/2.0/data/product-image');
const controller = {};

controller.add = (req,res) => {

    if(typeof req.body.data ==="object"){
        req.body.data.forEach(image=>{
            image.id = uuid.v4(),
            image.dataProductId = req.params.id
        });
    }else{
        res.status(400).send();
        return;
    }

    model.bulkCreate(req.body.data,{
    })
    
    .then(result => {
        res.send(result);
        return;
    },
    error => {
        res.send({error});
        return;
    }
    )
}

module.exports = controller;