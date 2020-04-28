function getAccountInfo(req, res) {
    try {
        res.status(200).send();
    } catch (e) {
        console.error("getAccountInfo: ", e);
        res.status(500).send();
    }
}

module.exports = {
    getAccountInfo
}