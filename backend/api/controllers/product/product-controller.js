const mysqlProduct = require("../../../database/mysql/facade/models/product/product");
const fs = require("fs");
const https = require("https");
const uuid = require("uuid");
const sharp = require("sharp");

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
        const { name, description, idUnit, unitPrice, types, ingredients, fileBase64Arr } = req.body;
        const fileNames = [];
        if (fileBase64Arr.length > 0) {
            for (let file of fileBase64Arr) {
                const base64Data = file.split(",")[1];
                const img = new Buffer(base64Data, "base64");
                const resizedImageBuffer = await sharp(img).resize(600, 400).toBuffer();
                let resizedImageData = resizedImageBuffer.toString("base64");
                const fileName = uuid.v4() + ".jpg";
                fileNames.push(fileName);
                fs.writeFileSync(`${__dirname}/../../../public/img/${fileName}`, resizedImageData, "base64", function (
                    err
                ) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
        const info = {
            name,
            description,
            idUnit,
            unitPrice,
            types,
            ingredients,
            fileNames,
        };
        await mysqlProduct.createProduct(info);
        res.status(201).send();
    } catch (e) {
        console.error("createProduct: ", e);
        res.status(500).send();
    }
}
