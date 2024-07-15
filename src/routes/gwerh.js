const router = require('express').Router();

const github = require('../controllers/github');
const packages = require('../controllers/packages');
const apiSound = require('../controllers/api-sound');
const apiDesign = require('../controllers/api-design');
const apiDevelop = require('../controllers/api-develop');
const apiExperience = require('../controllers/api-experience');

router.use("/github", github);
router.use("/getsound", apiSound);
router.use("/packages", packages);
router.use("/getdesign", apiDesign);
router.use("/getdevelop", apiDevelop);
router.use("/getexperience", apiExperience);

module.exports = router;