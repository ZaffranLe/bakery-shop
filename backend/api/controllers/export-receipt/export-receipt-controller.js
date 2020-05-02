const mysqlExportReceipt = require("../../../database/mysql/facade/models/export-receipt/export-receipt");

module.exports = {
    getAllStatus,
    getStatus,
    createStatus,
    updateStatus,
    deleteStatus,
};

async function getAllStatus(req, res) {
    try {
        const data = await mysqlExportReceipt.getStatus();
        res.json(data);
    } catch (e) {
        console.error("getAllStatus: ", e);
        res.status(500).send();
    }
}

async function getStatus(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlExportReceipt.getStatus(id);
        res.json(data);
    } catch (e) {
        console.error("getStatus: ", e);
        res.status(500).send();
    }
}

async function createStatus(req, res) {
    try {
        const { name, description } = req.body;
        const info = {
            name,
            description,
            isDeleted: 0,
        };
        await mysqlExportReceipt.createStatus(info);
        res.status(201).send();
    } catch (e) {
        console.error("createStatus: ", e);
        res.status(500).send();
    }
}

async function updateStatus(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const info = {
            name,
            description,
        };
        await mysqlExportReceipt.updateStatus(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("updateStatus: ", e);
        res.status(500).send();
    }
}

async function deleteStatus(req, res) {
    try {
        const { id } = req.params;
        const info = {
            isDeleted: 1,
        };
        await mysqlExportReceipt.updateStatus(id, info);
        res.status(200).send();
    } catch (e) {
        console.error("deleteStatus: ", e);
        res.status(500).send();
    }
}
