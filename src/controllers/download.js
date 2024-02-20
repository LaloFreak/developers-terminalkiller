const router = require('express').Router();
const path = require('path');

router.get("/:software", async (req, res) => {
  const { software } = req.params;
  console.log(software);
  const filePath = path.join('developers', 'Gwerh', 'download', software);
  return res.download(filePath);
});

module.exports = router;