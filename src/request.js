
import { apiKey } from "./tmdb";
const requests = {
    fetchTrending: `/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${apiKey}&with_networks=213`,
    fetchTopRated: `movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    fetchActionMovies: `/discover/movie?api_key=${apiKey}&with_genres=28`,
    fetchActionTv: `/discover/tv?api_key=${apiKey}&with_genres=10759&sort_by=popularity.desc&with_origin_country=US`,
    fetchComedyMovies: `/discover/movie?api_key=${apiKey}&with_genres=35`,
    fetchComedyTv: `/discover/tv?api_key=${apiKey}&with_genres=35&with_origin_country=US`,
    fetchHorrorHovies: `/discover/movie?api_key=${apiKey}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${apiKey}&with_genres=10749`,
    fetchMystries: `/discover/movie?api_key=${apiKey}&with_genres=9648`,
    fetchFantasies: `/discover/movie?api_key=${apiKey}&with_genres=14`
};
export default requests;

// https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1