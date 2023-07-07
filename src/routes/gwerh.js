const fetch = require('node-fetch');
const router = require('express').Router();
const develop = require('../../developers/Gwerh/develop-api.json');
const sound = require('../../developers/Gwerh/sound-api.json');
const auth = require('..//integrations/google');

const { loginUserWithGoogle } = require('../controllers/users');

router.get("/getdevelop", async (req, res) => {
    res.status(200).send(develop)
});

router.get("/getdesign", async (req, res) => {
    res.status(200).send('funciona hdp')
});

router.get("/getsound", async (req, res) => {
    res.status(200).send(sound)
});

router.use("/auth/google", auth)

router.post("/users/loginwithgoogle", async (req, res) => {
    try {
        const { accessToken } = req.body
        const response = await loginUserWithGoogle(accessToken)
        res.status(200).json({ msg: response });
    } catch (error) {
        res.status(400).json({ error: error }); 
    }
});

router.get("/packages", async (req, res) => {
    try {
      const username = 'gwerhdev';
      const searchUrl = `https://registry.npmjs.org/-/_view/byUser?key="${username}"`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      console.log(data.message);
      const packageNames = data.rows.map((row) => row.key[1]);
      res.json({ paquetes: packageNames });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de paquetes' });
    }
});

module.exports = router;