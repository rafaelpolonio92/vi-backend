const axios = require('axios');
const {
  actorsParser,
  actorsWithMultipleCharsParser,
} = require('../utils/actorsParser');

const apiKey = 'ac505a02032a33d65dd28b41f72182e1';

const getStudio = async (studioName) => {
  const studioQueryFormat = studioName.split(' ').join('+');
  const studioResponse = await axios.get(
    `https://api.themoviedb.org/3/search/company?api_key=${apiKey}&query=${studioQueryFormat}`
  );
  return studioResponse.data.results;
};

const listStudioMovies = async (results) => {
  let studioMoviesList = [];
  const studioId = results[0].id;
  const firstPageResult = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=primary_release_date.desc&page=1&with_companies=${studioId}`
  );
  const totalPagesNumber = firstPageResult.data.total_pages;
  studioMoviesList.push(firstPageResult.data.results);
  for (let i = 2; i <= totalPagesNumber; i++) {
    const {
      data: { results },
    } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=primary_release_date.desc&page=${i}&with_companies=${studioId}`
    );
    studioMoviesList.push(results);
  }
  const moviesIds = studioMoviesList.flat().map((val) => val.id);
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

  return {
    actors,
    actorsWithMultipleChars,
  };
};

const moviesFlow = async (studioQuery) => {
  const studio = await getStudio(studioQuery);
  const studioMoviesIds = await listStudioMovies(studio);
  const { actors, actorsWithMultipleChars } = await moviesCast(studioMoviesIds);
  return {
    actors,
    actorsWithMultipleChars,
  };
};

module.exports = { moviesFlow };
