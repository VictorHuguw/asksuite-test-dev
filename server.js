require('dotenv').config();
const express = require('express');
const router = require('./routes/router.js');
const bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT;

app.use('/', router);

app.listen(port || 8080, () => {

    console.log(`Listening on port ${port}`);
    
});


module.exports = app