import React from "react";
import { IMG_DEFAULT_URL } from "../utils/constants/constants";

const MovieCard = ({ movie }) => {
  if (!movie.poster_path) return null;
  return (
    <div className="w-[128px]  sm:w-[192px]  md:w-[200px] lg:w-[210px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`${IMG_DEFAULT_URL}${movie.poster_path}`}
        alt="movie img"
      />
    </div>
  );
};

export default MovieCard;
