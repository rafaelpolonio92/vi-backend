const { Router } = require('express');
const actors = require('./actors');
const chars = require('./chars');
const router = Router();

router.use('/actors', actors);
router.use('/chars', chars);

module.exports = router;
