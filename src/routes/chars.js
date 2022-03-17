const { moviesFlow } = require('../controller/actorsController');
const { Router } = require('express');

const router = Router();

router.get('/list/multiple_actors', async (req, res) => {
  try {
    const studioQuery = req.query.studio;
    const { charsWithMultipleActors } = await moviesFlow(studioQuery);
    return res.status(200).send(charsWithMultipleActors);
  } catch (error) {
    return res.status(error.response.status || 500).json({
      success: false,
      error: error.response.data.status_message || 'Unknown error',
    });
  }
});

module.exports = router;
