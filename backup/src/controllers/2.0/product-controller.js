/**
 * Module exports the service for Product entities.
 * @method create creates a new product entitiy
 * @method list queries all products with no filters added.
 * @method update updates a product
 * @method delete marks a product for deletion. Deletion is not possible pending transactions exist.
 */

const uuid = require('uuid');
const model = require('../../models/2.0/data/product');
const Category = require('../../models/2.0/system/category');
const SubCategory = require('../../models/2.0/system/sub_category');
const Brand = require('../../models/2.0/system/brand');
const Images = require('../../models/2.0/data/product-image');
const {ProductVariant, VariantSize} = require('../../models/2.0/data/product-variant');
const controller = {};

/**
 * Creates a new product.
 * @param req.body.data.sku is required
 * @param req.body.data.sysCategoryId is required
 * @param req.body.data.sysSubCategoryId is required
 * @param req.body.data.sysBrandId is required
 */
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
            res.send(error);
            return;
        })  
};

/**
 * Retrieves a list of products
 * where clause with the value to check against
 * @param req.query.limit and @param req.query.offset are special 
 * keys and will not be included in the where clause.
 * @returns a product object
 */

controller.list = (req,res) => {
    //TODO.md: This is a temporary patch. Limit and Offset should still need to be available
    if(req.query.color || req.query.size || req.query.order){
        delete req.query.limit;
        delete req.query.offset;
    }
    const limit = !isNaN(req.query.limit)?parseInt(req.query.limit):null;
    const offset = !isNaN(req.query.offset)?parseInt(req.query.offset):null;
    
    const colorQuery = req.query.color?{
        '$variation.color$':req.query.color
    }
    :null;
    const sizeQuery = req.query.size?{
        '$variation.size.name$': req.query.size}
    :null;
    
    const orderQuery = req.query.order&&req.query.direction?[req.query.order,req.query.direction]:null;
    
   
    
    try{
        delete req.query.limit;
        delete req.query.offset;
        delete req.query.color
        delete req.query.size
        delete req.query.order;
        delete req.query.direction;
    }catch(e){
        console.error(e)
    }

    model.findAndCountAll({
        where:{
            ...req.query,
            ...colorQuery,
            ...sizeQuery
        },
        order: orderQuery?[orderQuery]:[],
        attributes: [
            'id',
            'sku',
            'shortDescription',
            'fullDescription',
            'stock',
            'price',
            'discount',
            'offerEnd',
            'new',
            'rating'
        ],
        limit:limit,
        offset:offset,
        // include: {all: true, nested: true}
        include:[
        {
            model: Category,
            as:'category',
            attributes: ['category']
        },
        {
            model: SubCategory,
            as:'subCategory',
            attributes: ['subCategory']
        },
        {
            model: Brand,
            as:'brand',
            attributes: ['brand']
        },
        {
            model: Images,
            as: 'image',
            attributes: ["url"]
        },
        {
            model: ProductVariant,
            as:'variation',
            attributes: ["id","color","image"],
            include: [
                {
                    model: VariantSize,
                    as:"size",
                    attributes: ["name","stock"],
                }
            ]

        }
    ]
    })
    .then(results => {
        res.send({
            results:results.rows,
            total_product_count:results.count
        });
        return;
    },error=>{
        console.error(error)
        res.status(500).send({results:[],error:error});
        return;
    })

}

   
controller.update = (req,res) => {
    model.update({
        ...req.body.data
    },{
        where:{
            id:req.params.id
        }
    })
    .then(result => {
        console.log(result)

        res.send(result);
        return;
    },
    error=>{
        console.log(error)
        res.send(error);
        return;
    })
}

controller.delete = (req,res) => {
    model.update({
        deleted:true
    },{
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.send(result);
        return;
    },
    error=>{
        res.send(error);
        return;
    })
}
    


module.exports = controller;