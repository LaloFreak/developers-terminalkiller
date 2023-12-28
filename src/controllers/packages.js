const router = require('express').Router();
const { default: axios } = require('axios');
const { NPM_ACCESS_TOKEN } = require('../config');

router.get("/", async (req, res) => {
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