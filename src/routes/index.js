const router = require('express').Router();
const User = require('../models/User');
const programming = require('../../programming-api.json')

router.get("getdevelop", async (req, res) => {
    res.status(200).send(programming)
});

router.get("getdesign", async (req, res) => {
    res.status(200).send('funciona hdp')
});

router.get("getsound", async (req, res) => {
    res.status(200).send('funciona hdp')
});

module.exports =  router