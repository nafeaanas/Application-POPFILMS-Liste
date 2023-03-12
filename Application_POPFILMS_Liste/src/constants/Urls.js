const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const TMDB_API_KEY = "bcc4ff10c2939665232d75d8bf0ec093";

const ENDPOINTS = {
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    UPCOMING_MOVIES: "/movie/upcoming",
    GENRES: "/genre/movie/list",
    MOVIE: "/movie",
};

const APPEND_TO_RESPONSE = {
    CREDITS : "credits"
}

export {TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_API_KEY, ENDPOINTS, APPEND_TO_RESPONSE}