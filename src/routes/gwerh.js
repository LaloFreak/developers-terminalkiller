const router = require('express').Router();

const github = require('../controllers/github');
const packages = require('../controllers/packages');
const apiSound = require('../controllers/api-sound');
const apiDesign = require('../controllers/api-design');
const apiDevelop = require('../controllers/api-develop');

router.use("/github", github);
router.use("/getsound", apiSound);
router.use("/packages", packages);
router.use("/getdesign", apiDesign);
router.use("/getdevelop", apiDevelop);

module.exports = router;