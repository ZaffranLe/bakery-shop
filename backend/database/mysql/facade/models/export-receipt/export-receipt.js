const db = require("../../bakery-base-init");
const _ = require("lodash");

module.exports = {
    getStatus,
    createStatus,
    updateStatus,
};

async function getStatus(id = "") {
    const params = [];
    let query = `SELECT * FROM export_receipt_status WHERE isDeleted = 0`;
    if (id) {
        query += ` AND id = ?`;
        params.push(id);
    }
    return await db.query(query, params);
}

async function createStatus(info) {
    const fields = ["name", "isDeleted", "description"];
    const data = _.pick(info, fields);
    const query = `INSERT INTO export_receipt_status SET ?`;
    await db.query(query, [data]);
}

async function updateStatus(id, info) {
    const fields = ["name", "isDeleted", "description"];
    const data = _.pick(info, fields);
    const query = `UPDATE export_receipt_status SET ? WHERE id = ?`;
    await db.query(query, [data, id]);
}
