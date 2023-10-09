import React from "react";
import { IMG_DEFAULT_URL } from "../utils/constants/constants";
import { useDispatch } from "react-redux";
import { addMoviId, openModal } from "../utils/slices/modalSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const handleModal = (movieId) => {
    dispatch(addMoviId(movieId));
    dispatch(openModal());
  };
  if (!movie.poster_path) return null;

  return (
    <div className="w-[128px]  sm:w-[192px]  md:w-[200px] lg:w-[210px] inline-block cursor-pointer relative p-2">
      <img
        onClick={() => handleModal(movie.id)}
        className="w-full h-auto block"
        src={`${IMG_DEFAULT_URL}${movie.poster_path}`}
        alt="movie img"
      />
    </div>
  );
};

export default MovieCard;
