const router = require('express').Router();
const design = require('../../developers/Gwerh/design-api.json');


router.get("/", async (req, res) => {
  res.status(200).send(design)
});

module.exports = router;