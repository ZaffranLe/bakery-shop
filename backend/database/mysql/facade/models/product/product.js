const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getProducts,
    createProduct,
};

async function getProducts() {
    const query = `SELECT t1.id, t1.name, t1.description, t1.unitPrice, t1.idUnit, t2.name AS unit,
                   (SELECT GROUP_CONCAT(t3.idType SEPARATOR ';') FROM product_type t3 WHERE t1.id = t3.idProduct) as idTypes,
                   (SELECT GROUP_CONCAT(t4.name SEPARATOR ';') FROM image t4 WHERE t1.id = t4.idProduct) as images,
                   (SELECT GROUP_CONCAT(CONCAT(t5.idIngredient,"-",t5.amount) SEPARATOR ';') FROM product_ingredient t5 WHERE t1.id = t5.idProduct) as ingredients
                   FROM product t1
                   JOIN unit t2 ON t1.idUnit = t2.id`;
    return await db.query(query, []);
}

async function createProduct(info) {
    const productFields = ["name", "description", "idUnit", "unitPrice", "isDeleted"];
    const con = await db.getConnection();
    try {
        await db.beginTransaction(con);
        const insertProductQuery = `INSERT INTO product SET ?`;
        const productData = _.pick(info, productFields);
        const result = await db.transactionQuery(con, insertProductQuery, [productData]);
        if (info["fileNames"].length > 0) {
            const insertImageQuery = `INSERT INTO image SET ?`;
            for (let name of info["fileNames"]) {
                const imageData = {
                    name,
                    idProduct: result.insertId,
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertImageQuery, [imageData]);
            }
        }
        if (info["types"].length > 0) {
            const insertTypesQuery = `INSERT INTO product_type SET ?`;
            for (let type of info["types"]) {
                const typeData = {
                    idProduct: result.insertId,
                    idType: type,
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertTypesQuery, [typeData]);
            }
        }
        if (info["ingredientObjArr"].length > 0) {
            const insertIngredientsQuery = `INSERT INTO product_ingredient SET ?`;
            for (let ingredient of info["ingredients"]) {
                const ingredientData = {
                    idProduct: result.insertId,
                    idIngredient: ingredient["idIngredient"],
                    amount: ingredient["amount"],
                    isDeleted: 0,
                };
                await db.transactionQuery(con, insertIngredientsQuery, [ingredientData]);
            }
        }
        await db.commitTransaction(con);
    } catch (e) {
        await db.rollbackTransaction(con);
        throw e;
    } finally {
        con.destroy();
    }
}
