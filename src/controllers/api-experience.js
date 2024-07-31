const router = require('express').Router();
const experience = require('../../developers/Gwerh/experience-api.json');

router.get("/", async (req, res) => {
  res.status(200).send(experience);
});

module.exports = router;