const router = require('express').Router();
const User = require('../models/User');

router.get("getdevprojects", async (req, res) => {
    res.status(200).send('funciona hdp')
});



module.exports =  router