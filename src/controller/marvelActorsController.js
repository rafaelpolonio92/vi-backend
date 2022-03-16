const axios = require('axios');

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
  for (let i = 1; i <= totalPagesNumber; i++) {
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
  console.log(movieIds);
  const result = await Promise.all(
    movieIds.map(async (id) => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
      );
      return data;
    })
  );
  console.log(result);
  return result;
};

const moviesFlow = async () => {
  const studio = await getStudio('Marvel Studio');
  const studioMoviesIds = await listStudioMovies(studio);
  const movieActors = await moviesCast(studioMoviesIds);
  return movieActors;
};

module.exports = { moviesFlow };
