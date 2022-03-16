const { Router } = require('express');
const actors = require('./actors');
const router = Router();

router.use('/actors', actors);

module.exports = router;
