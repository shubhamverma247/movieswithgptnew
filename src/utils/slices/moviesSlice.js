import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "moveis",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
    movieTitle: null,
    movieOverview: null,
    movieKey: null,
    img: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMovieInfo: (state, action) => {
      const { movieTitle, movieOverview, movieKey, img } = action.payload;
      state.movieTitle = movieTitle;
      state.movieOverview = movieOverview;
      state.movieKey = movieKey;
      state.img = img;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addMovieInfo,
} = moviesSlice.actions;
export default moviesSlice.reducer;
