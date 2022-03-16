const { Router } = require('express');
const movies = require('./movies');
const router = Router();

router.use('/movies', movies);

module.exports = router;
