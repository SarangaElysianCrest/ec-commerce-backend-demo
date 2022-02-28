const uuid = require('uuid');
const {Item,Order} = require('../../models/2.0/transactions/order');
const controller = {}

controller.create = (req,res) => {
    if(!req.body.order && !req.body.items && Array.isArray(req.body.item)){
        res.status(400).send();
        return;
    }

    const orderId = uuid.v4();
    const items = req.body.items.map(item=>{
        return {
            id:uuid.v4(),
            ...item,
            transOrderId: orderId
        }
    });

    Promise.all([
        Order.create({
            id:orderId,
            ...req.body.order
        }),

        Item.bulkCreate(items)

    ])
    .then(result=>{
        res.send(result);
        console.log(result)
        return;
    },
    error=>{
        res.send({error});
        console.error(error)
        return;
    })
    
    

}

module.exports = controller;