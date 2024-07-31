const router = require('express').Router();
const develop = require('../../developers/Gwerh/develop-api.json');

router.get("/", async (req, res) => {
  return res.status(200).send(develop);
});

router.get("/featured", async (req, res) => {
  const featured = develop[0]?.web.filter((e) => e.featured === true);
  return res.status(200).send(featured);
});

module.exports = router;