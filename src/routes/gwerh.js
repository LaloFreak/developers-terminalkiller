const router = require('express').Router();
const develop = require('../../developers/Gwerh/develop-api.json');
const sound = require('../../developers/Gwerh/sound-api.json');

router.get("/getdevelop", async (req, res) => {
    res.status(200).send(develop)
});

router.get("/getdesign", async (req, res) => {
    res.status(200).send('funciona hdp')
});

router.get("/getsound", async (req, res) => {
    res.status(200).send(sound)
});

module.exports = router;