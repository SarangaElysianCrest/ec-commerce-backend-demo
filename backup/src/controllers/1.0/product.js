const queries = require('../../queries/product');
const dto = require('../../models/1.0/product');
const controller = {}


//Lists all Products in the Database
controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        if(err) res.json(err)
        else{
            conn.query(queries.getAllProducts(req.params.offset,req.params.limit), function(error,results,fields){
                if(error) throw error
                    count(req,(count)=>{
                        
                        res.json({total_product_count:count,results:results.map(product=>dto(product))});
                    })
            })

        }
    })
} 

//List sorted products
controller.sort = (req,res) => {
    req.getConnection( (err,conn)=>{
        if (err) res.json(err);
        else{
            conn.query(queries.getSortedProducts(req.params.type,conn.escape(req.params.value),req.params.offset,req.params.limit), function(error,results,fields){
                if(error) throw error;
                count(req,(count)=>{
                    res.json({total_product_count:count,results:results.map(product=>dto(product))});
                })
            })

        }

    })
}

controller.categories = (req,res) => {
    req.getConnection((err,conn) => {
        if(err) throw err;
        else{
            conn.query(queries.getCategories(), function(error,results,fields){
                if(error) throw error;
                res.json(results)
            })
        }
    })
} 

controller.subCategories = (req,res) => {
    req.getConnection((err,conn) => {
        if(err) throw err;
        else{
            conn.query(queries.getSubCategories(conn.escape(req.params.category)), function(error,results,fields){
                if(error) throw error;
                res.json({category:req.params.category,subs:results.map(sub=>{return sub.sub_category})})
            })
        }
    })
}


controller.brands = (req,res) => {
    req.getConnection((err,conn) => {
        if(err) throw err
        else{
            conn.query(queries.getAllBrands(conn.escape(req.params.category),parseInt(req.params.all)),function(error,results,fields){
                if(error) throw error;
                res.json(results.map(brand=>{return brand.brand}))
            })
        }
    }) 
}

//Helpers
const count = (req,cb) => {
    req.getConnection ( (err,conn) =>{
        if(err) res.json(err);
        else{
            conn.query(queries.count(req.params.type,conn.escape(req.params.value)),function(error,results,fields){
                if(error) throw error;
                 cb(results[0].COUNT)
            })
        }
    } )
}
module.exports = controller;