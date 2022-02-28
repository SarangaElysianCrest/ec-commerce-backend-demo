const uuid = require('uuid');
const {Sequelize} = require('sequelize');
const {ProductVariant,VariantSize} = require('../../models/2.0/data/product-variant');
// const { Sequelize } = require('sequelize/types');
const controller = {};

controller.addVariant = (req,res) => {
    ProductVariant.create({
        id: uuid.v4(),
        dataProductId: req.params.id,
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

controller.addSize = (req,res) => {
    VariantSize.create({
        id: uuid.v4(),
        dataProductVariantId: req.params.id,
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

controller.listFeatures = async (req,res) => {
    try{
        const colors = await ProductVariant.findAll({
            attributes:[
                [Sequelize.fn('DISTINCT', Sequelize.col('color')) ,'color'],
            ]
        });
    
        const sizes = await VariantSize.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']
            ]
        });

        if(colors&&sizes){
            res.send({
                colors: colors.map(color=>{return color.color}),
                sizes: sizes.map(size=>{return size.name})
            })
            return;
        }else{
            res.send([]);
            return;
        }

    }catch(e){
        console.error(e);
        res.status(500).send();
    }


}

module.exports = controller;