const mysqlProduct = require("../../../database/mysql/facade/models/product/product");

module.exports = {
    getProducts,
    createProduct,
};

async function getProducts(req, res) {
    try {
        const data = await mysqlProduct.getProducts();
        res.json(data);
    } catch (e) {
        console.error("getProducts: ", e);
        res.status(500).send();
    }
}

async function createProduct(req, res) {
    try {
        console.log(req.body);
        res.status(201).send();
    } catch (e) {
        console.error("createProduct: ", e);
        res.status(500).send();
    }
}