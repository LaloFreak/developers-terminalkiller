const router = require('express').Router();
const develop = require('../../developers/Gwerh/develop-api.json');


router.get("/", async (req, res) => {
  res.status(200).send(develop)
});

module.exports = router;