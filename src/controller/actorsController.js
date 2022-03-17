const {
  getStudio,
  listStudioMovies,
  moviesCast,
} = require('../services/moviesDbService');

const moviesFlow = async (studioQuery) => {
  const studio = await getStudio(studioQuery);
  const studioMoviesIds = await listStudioMovies(studio);
  const { actors, actorsWithMultipleChars, charsWithMultipleActors } =
    await moviesCast(studioMoviesIds);
  return {
    actors,
    actorsWithMultipleChars,
    charsWithMultipleActors,
  };
};

module.exports = { moviesFlow };
