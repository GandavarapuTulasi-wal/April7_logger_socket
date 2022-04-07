const express = require('express');
const router = express.Router();
router.get('/', function (req, res) {
  res.json('Welcome to the live app').status(200);
});
module.exports = router;
