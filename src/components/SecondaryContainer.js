import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import SavedShows from "./SavedShows";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    // <div className="bg-black">
    //   <div className="-mt-32 md:-mt-52 pl-2 md:pl-12 relative z-20">
    <div className="bg-black">
      <div className="-mt-[20%]  md:-mt-[13%] z-40 relative">
        {" "}
        <MovieList
          title="Now Playing"
          rowID={1}
          movies={movies.nowPlayingMovies}
        />
        <MovieList title="Popular" rowID={2} movies={movies.popularMovies} />
        <SavedShows />
      </div>
    </div>

    //   </div>
    // </div>
  );
};

export default SecondaryContainer;
