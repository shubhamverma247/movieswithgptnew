import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addMoviId, closeModal } from "../utils/slices/modalSlice";
import { db } from "../utils/configs/firebase";
import { arrayUnion, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { API_OPTIONS } from "../utils/constants/constants";
import { addMovieInfo } from "../utils/slices/moviesSlice";

const InfoModal = ({ visible, movieId }) => {
  const user = useSelector((store) => store.user);
  const [isVisible, setIsVisible] = useState(!!visible);
  const [isSavedShow, setIsSavedShow] = useState(false);
  const { movieTitle, movieOverview, movieKey, img } = useSelector(
    (store) => store.movies
  );
  const dispatch = useDispatch();

  const getMovieInfo = async (movieId) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const { overview, original_title, poster_path } = json;
    //second api call to get key
    const data2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json2 = await data2.json();

    const filteredData = json2?.results?.filter(
      (video) => video?.type === "Trailer"
    );
    const { key } = filteredData.length ? filteredData[0] : json2.results[0];

    dispatch(
      addMovieInfo({
        movieTitle: original_title,
        movieOverview: overview,
        movieKey: key,
        img: poster_path,
      })
    );
  };
  const handleClose = () => {
    dispatch(addMoviId(0));
    dispatch(closeModal());
    setIsSavedShow(false);
  };

  movieId != 0 &&
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setIsSavedShow(
        doc.data()?.savedShows.filter((item) => item.id === movieId).length > 0
      );
    });
  const MovieId = doc(db, "users", `${user?.email}`);

  const savedShow = async () => {
    setIsSavedShow(true);
    await updateDoc(MovieId, {
      savedShows: arrayUnion({
        id: movieId,
        title: movieTitle,
        discription: movieOverview,
        key: movieKey,
        img: img,
      }),
    });
    handleClose();
  };
  useEffect(() => {
    setIsVisible(!!visible);
    movieId !== 0 && getMovieInfo(movieId);
  }, [visible]);

  if (!visible || movieId === 0) {
    return null;
  }
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-[360px] mx-auto max-w-[360px] rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
          <div className="relative h-[200px]">
            <iframe
              className="w-[360px] brightness-[60%] object-cover h-full"
              src={`https://www.youtube.com/embed/${movieKey}?rel=0?version=3&autoplay=1&mute=1&controls=0&start=4&showinfo=0&loop=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              <AiOutlineClose className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-5">
              <p className="text-white text-xl md:text-2xl h-full lg:text-2xl font-bold mb-4">
                {movieTitle}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <div className="cursor-pointer group/item w-5 h-5 lg:w-8 lg:h-8 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                  {isSavedShow ? (
                    <AiFillHeart className="text-white group-hover/item:text-neutral-300 w-4 lg:w-5" />
                  ) : (
                    <AiOutlineHeart
                      onClick={savedShow}
                      className="text-white group-hover/item:text-neutral-300 w-4 lg:w-5"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <p className="text-white text-md">{movieOverview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
