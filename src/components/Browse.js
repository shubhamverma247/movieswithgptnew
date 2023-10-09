import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMoveis from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import InfoModal from "./InfoModal";

const Browse = () => {
  const gptSearch = useSelector((store) => store.gpt.toggleGPT);
  const isOpen = useSelector((store) => store.modal.isOpen);
  const movieId = useSelector((store) => store.modal.movieId);
  useNowPlayingMovies();
  usePopularMoveis();
  return (
    <div>
      <Header />
      {gptSearch ? (
        <GptSearch />
      ) : (
        <>
          <InfoModal visible={isOpen} movieId={movieId} />
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
