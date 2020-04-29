const db = require("../../bakery-base-init");

module.exports = {
    getUserLoginInfo,
    getUserPermission,
}

async function getUserLoginInfo(username) {
    const query =`SELECT * FROM user WHERE username = ?`;
    const result = await db.query(query, [username]);
    return result[0];
}

async function getUserPermission(id) {
    const query = `SELECT name FROM permission WHERE id = ?`;
    const result = await db.query(query, [id]);
    return result[0];
}