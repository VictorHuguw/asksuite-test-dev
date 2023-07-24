const express = require('express');
const router = express.Router();
const service = require("../services/BrowserService")

router.get('/', (req, res) => {
    res.send('Hello Asksuite World!');
});


router.post('/search', service.getBrowser);

module.exports = router;
