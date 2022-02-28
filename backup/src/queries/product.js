const queries = {};



queries.getAllProducts = (offset,limit) =>{
    var sql = `SELECT 
    dpv.variation ,dp.*,dpi.image,dpt.tag
    FROM data_product dp
  
    LEFT JOIN
    (SELECT
    t.sku
    ,GROUP_CONCAT(t.url) AS image 
    FROM data_product_image AS t GROUP BY sku) dpi
    ON dpi.sku = dp.sku 
    
    LEFT JOIN
    (SELECT
    t.sku
    ,GROUP_CONCAT(t.tag) AS tag 
    FROM data_product_tag AS t GROUP BY sku) dpt
    ON dpt.sku = dp.sku 
    
    LEFT JOIN
    (SELECT
    t.sku
    ,
    CONCAT("[",GROUP_CONCAT('{\"color\":\"',t.color,'\",\"size\":[',COALESCE(stock,""),'],\"image\":\"', COALESCE(t.image,"null"),'\"}' SEPARATOR ","),"]") AS variation 
    FROM 
    (
        SELECT
        color,image,
        sku,stock FROM 
        data_product_variation dpv2
        LEFT JOIN
        (SELECT
        t.variant_id,
        GROUP_CONCAT('{\"name\":\"',t.name,'\",\"stock\":',t.stock,"}") as stock
        FROM
        data_variation_size AS t GROUP BY variant_id 
        ) dvz
        ON dvz.variant_id = dpv2.variant_id 
    )
    AS t GROUP BY sku) dpv
    ON dpv.sku = dp.sku 
    
    GROUP BY dp.sku`;

    if(limit){
        sql = sql.concat(offset?` LIMIT ${offset},${limit}`:` LIMIT ${limit}`);    
    }

    return {sql:sql, nestTables:true}
}


queries.getSortedProducts = (type,value,offset,limit) => {
    var sql;
    if(type==="category"){
        sql = `SELECT 
        dpv.variation ,dp.*,dpi.image,dpt.tag
        FROM data_product dp
      
        LEFT JOIN
        (SELECT
        t.sku
        ,GROUP_CONCAT(t.url) AS image 
        FROM data_product_image AS t GROUP BY sku) dpi
        ON dpi.sku = dp.sku 
        
        LEFT JOIN
        (SELECT
        t.sku
        ,GROUP_CONCAT(t.tag) AS tag 
        FROM data_product_tag AS t GROUP BY sku) dpt
        ON dpt.sku = dp.sku 
        
        LEFT JOIN
        (SELECT
        t.sku
        ,
        CONCAT("[",GROUP_CONCAT('{\"color\":\"',t.color,'\",\"size\":[',COALESCE(stock,""),'],\"image\":\"', COALESCE(t.image,"null"),'\"}' SEPARATOR ","),"]") AS variation 
        FROM 
        (
            SELECT
            color,image,
            sku,stock FROM 
            data_product_variation dpv2
            LEFT JOIN
            (SELECT
            t.variant_id,
            GROUP_CONCAT('{\"name\":\"',t.name,'\",\"stock\":',t.stock,"}") as stock
            FROM
            data_variation_size AS t GROUP BY variant_id 
            ) dvz
            ON dvz.variant_id = dpv2.variant_id 
        )
        AS t GROUP BY sku) dpv
        ON dpv.sku = dp.sku 
        WHERE dp.category = ${value}
        GROUP BY dp.sku`
    }
    if(type==="sub-category"){
        sql = `SELECT 
        dpv.variation ,dp.*,dpi.image,dpt.tag
        FROM data_product dp
      
        LEFT JOIN
        (SELECT
        t.sku
        ,GROUP_CONCAT(t.url) AS image 
        FROM data_product_image AS t GROUP BY sku) dpi
        ON dpi.sku = dp.sku 
        
        LEFT JOIN
        (SELECT
        t.sku
        ,GROUP_CONCAT(t.tag) AS tag 
        FROM data_product_tag AS t GROUP BY sku) dpt
        ON dpt.sku = dp.sku 
        
        LEFT JOIN
        (SELECT
        t.sku
        ,
        CONCAT("[",GROUP_CONCAT('{\"color\":\"',t.color,'\",\"size\":[',COALESCE(stock,""),'],\"image\":\"', COALESCE(t.image,"null"),'\"}' SEPARATOR ","),"]") AS variation 
        FROM 
        (
            SELECT
            color,image,
            sku,stock FROM 
            data_product_variation dpv2
            LEFT JOIN
            (SELECT
            t.variant_id,
            GROUP_CONCAT('{\"name\":\"',t.name,'\",\"stock\":',t.stock,"}") as stock
            FROM
            data_variation_size AS t GROUP BY variant_id 
            ) dvz
            ON dvz.variant_id = dpv2.variant_id 
        )
        AS t GROUP BY sku) dpv
        ON dpv.sku = dp.sku 
        WHERE dp.sub_category = ${value}
        GROUP BY dp.sku`
    }
    if(type==="brand"){
        
    }

    if(limit){
        sql = sql.concat(offset?` LIMIT ${offset},${limit}`:` LIMIT ${limit}`);
    }

    return {sql:sql, nestTables:true}
}


queries.count = (type,value) =>{
    if(!type){
        return 'SELECT COUNT(DISTINCT (sku)) AS COUNT from data_product';
    }
    if(type==="category"){
        return `SELECT COUNT(DISTINCT (sku)) AS COUNT from data_product WHERE category =${value}`
    }
    if(type==="sub-category"){
        return `SELECT COUNT(DISTINCT (sku)) AS COUNT from data_product WHERE sub_category =${value}`
    }
    
}

queries.getCategories = () => {
    return "SELECT category FROM sys_category";
}

queries.getSubCategories = (category) => {
    return `SELECT sub_category FROM eccommerce.sys_sub_category ssc WHERE ssc.category = ${category}`;
    
}

queries.getAllBrands = (category,all) => {
    if(all){
        console.log(all)
        return `SELECT DISTINCT(brand) FROM eccommerce.data_product dp WHERE category = ${category}`
    }
    else{
        return `SELECT DISTINCT(brand) FROM eccommerce.data_product dp WHERE sub_category = ${category}`
    }
}

module.exports = queries;

