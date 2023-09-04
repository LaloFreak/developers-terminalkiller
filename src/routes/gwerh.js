const axios = require('axios');
const router = require('express').Router();

const authResume = require('../controllers/auth-resume');
const authMail = require('../controllers/auth-mail');
const users = require('../controllers/users');
const apiDevelop = require('../controllers/api-develop');
const apiDesign = require('../controllers/api-design');
const apiSound = require('../controllers/api-sound');

const { NPM_ACCESS_TOKEN } = require('../config');

router.use("/getdevelop", apiDevelop);
router.use("/getdesign", apiDesign);
router.use("/getsound", apiSound);

router.use("/auth/resume", authResume);
router.use("/auth/mail", authMail);

router.use("/users", users);

router.get("/packages", async (req, res) => {
    try {
        const user = 'terminalkillerproject'
        const url = `https://registry.npmjs.org/-/v1/search?text=author:{${user}}&size=10`;
        const token = NPM_ACCESS_TOKEN;
        const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` }})
        console.log(response.data);
        const packageNames = response.data.rows.map((row) => row.key[1]);
        res.json({ paquetes: packageNames });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de paquetes' });
    }
});

module.exports = router;