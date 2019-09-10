import { createAction } from 'redux-actions'
// hàm tạo Action từ thư viện redux-actions

export const FETCH_MOVIE = 'FETCH_MOVIE'
const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST'
const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS'
const FETCH_MOVIE_ERROR = 'FETCH_MOVIE_ERROR'

export const fetchMovieRequest = createAction(FETCH_MOVIE_REQUEST)
export const fetchMovieSuccess = createAction(FETCH_MOVIE_SUCCESS)
export const fetchMovieError = createAction(FETCH_MOVIE_ERROR)
