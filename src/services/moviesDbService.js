const axios = require('axios');
const {
  actorsParser,
  actorsWithMultipleCharsParser,
  charsWithDifferentActors,
} = require('../utils/actorsParser');

const apiKey = process.env.API_KEY;

const getStudio = async (studioName) => {
  const studioQueryFormat = studioName.split(' ').join('+');
  const studioResponse = await axios.get(
    `https://api.themoviedb.org/3/search/company?api_key=${apiKey}&query=${studioQueryFormat}`
  );
  return studioResponse.data.results;
};

const listStudioMovies = async (results) => {
  const studioId = results[0].id;
  const firstPageResult = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=primary_release_date.desc&page=1&with_companies=${studioId}`
  );
  const totalPagesNumber = firstPageResult.data.total_pages;
  const totalPagesArray = Array.from(
    { length: totalPagesNumber },
    (_, i) => i + 1
  );
  const result = await Promise.all(
    totalPagesArray.map(async (number) => {
      const {
        data: { results },
      } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=primary_release_date.desc&page=${number}&with_companies=${studioId}`
      );
      return results;
    })
  );
  const moviesIds = result.flat().map((val) => val.id);
  return moviesIds;
};

const moviesCast = async (movieIds) => {
  const result = await Promise.all(
    movieIds.map(async (id) => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
      );
      return data;
    })
  );
  const filteredMovies = result.filter(
    (movie) =>
      !movie.title.toLowerCase().includes('making') &&
      !movie.title.toLowerCase().includes('one-shot')
  );

  const actorsWithMovies = filteredMovies.flatMap((list) => {
    const actors = list.credits.cast.filter(
      (data) => data.known_for_department === 'Acting'
    );
    return actors.map((actor) => {
      return {
        actor: actor.name,
        character: actor.character,
        title: list.original_title,
        release_date: list.release_date,
      };
    });
  });

  const actors = actorsParser(actorsWithMovies);
  const actorsWithMultipleChars =
    actorsWithMultipleCharsParser(actorsWithMovies);
  const charsWithMultipleActors = charsWithDifferentActors(actorsWithMovies);

  return {
    actors,
    actorsWithMultipleChars,
    charsWithMultipleActors,
  };
};

module.exports = {
  getStudio,
  listStudioMovies,
  moviesCast,
};
