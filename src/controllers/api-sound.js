const router = require('express').Router();
const sound = require('../../developers/Gwerh/sound-api.json');


router.get("/", async (req, res) => {
  res.status(200).send(sound)
});

module.exports = router;