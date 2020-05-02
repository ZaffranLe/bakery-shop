const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getProducts,
}

async function getProducts() {
    const query = `SELECT t1.id, t1.name, t1.description, t1.unitPrice, t1.idUnit, t2.name AS unit,
                   (SELECT GROUP_CONCAT(t3.idType SEPARATOR ';') FROM product_type t3 WHERE t1.id = t3.idProduct) as idTypes,
                   (SELECT GROUP_CONCAT(t4.url SEPARATOR ';') FROM image t4 WHERE t1.id = t4.idProduct) as images,
                   (SELECT GROUP_CONCAT(t5.idIngredient SEPARATOR ';') FROM product_ingredient t5 WHERE t1.id = t5.idProduct) as idIngredients
                   FROM product t1
                   JOIN unit t2 ON t1.idUnit = t2.id`
    return await db.query(query, []);
}