import Axios from 'axios';

export async function requestGETMovies(accessToken, queryParams) {
  const options = {
    method: 'GET', // Method type
    baseURL: 'http://10.0.2.2:8082', // Base part of URL
    url: '/movie/search', // Path part of URL,
    params: queryParams,
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  return Axios.request(options);
}

export async function requestGETMovieByMovieId(accessToken, movieId) {
  const options = {
    method: 'GET', // Method type
    baseURL: 'http://10.0.2.2:8082', // Base part of URL
    url: '/movie/' + movieId, // Path part of URL,
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  return Axios.request(options);
}
