const router = require('express').Router();
const develop = require('../../developers/Gwerh/develop-api.json');
const featured = require('../../developers/Gwerh/develop-featured.json');

router.get("/", async (req, res) => {
  res.status(200).send(develop)
});

router.get("/featured", async (req, res) => {
  res.status(200).send(featured)
});

module.exports = router;