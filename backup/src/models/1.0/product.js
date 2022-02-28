module.exports = function productDTO(product){
    product.dp.id =  new String(product.dp.id)
    product.dp.category = product.dp.category?Object.assign(product.dp.category.split(",")):[];
    product.dp.image =  product.dpi.image?Object.assign(product.dpi.image.split(",")):[];
    product.dp.tag =  product.dpt.tag?Object.assign(product.dpt.tag.split(",")):[];

    if(product.dpv.variation){
        product.dp.variation = JSON.parse(product.dpv.variation)
        delete product.dpv
        delete product.dp.stock;
    }

    delete product.dpc;
    delete product.dpi;
    delete product.dpt;
    return product.dp
}

