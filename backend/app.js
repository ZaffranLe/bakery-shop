const express = require('express')
require('express-namespace');
const app = express()
const port = 3001

require('./routes/routes')(app);

app.listen(port, () => {
    console.log("Server started");
})