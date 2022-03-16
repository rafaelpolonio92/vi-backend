const { moviesFlow } = require('../controller/marvelActorsController');
const { Router } = require('express');

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const movies = await moviesFlow();
    return res.status(200).send(movies);
  } catch (error) {
    console.log(error);
    return res.status(error.response.status).json({
      success: false,
      error: error.response.data.status_message,
    });
  }
});

module.exports = router;
