const { moviesFlow } = require('../controller/actorsController');
const { Router } = require('express');

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const studioQuery = req.query.studio;
    const { actors } = await moviesFlow(studioQuery);
    return res.status(200).send(actors);
  } catch (error) {
    console.log(error);
    return res.status(error.response.status || 500).json({
      success: false,
      error: error.response.data.status_message || 'Unknown error',
    });
  }
});

router.get('/list/multiple_roles', async (req, res) => {
  try {
    const studioQuery = req.query.studio;
    const { actorsWithMultipleChars } = await moviesFlow(studioQuery);
    return res.status(200).send(actorsWithMultipleChars);
  } catch (error) {
    console.log(error);
    return res.status(error.response.status || 500).json({
      success: false,
      error: error.response.data.status_message || 'Unknown error',
    });
  }
});

module.exports = router;
