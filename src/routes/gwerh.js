const router = require('express').Router();

const users = require('../controllers/users');
const github = require('../controllers/github');
const packages = require('../controllers/packages');
const apiSound = require('../controllers/api-sound');
const authMail = require('../controllers/auth-mail');
const apiDesign = require('../controllers/api-design');
const authResume = require('../controllers/auth-resume');
const apiDevelop = require('../controllers/api-develop');

router.use("/users", users);
router.use("/github", github);
router.use("/getsound", apiSound);
router.use("/packages", packages);
router.use("/auth/mail", authMail);
router.use("/getdesign", apiDesign);
router.use("/getdevelop", apiDevelop);
router.use("/auth/resume", authResume);

module.exports = router;