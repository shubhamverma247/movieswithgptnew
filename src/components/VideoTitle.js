import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
      <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
        {title}
      </p>
      <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
        {overview}
      </p>
      <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
        <button
          className="
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        ">
          <BsFillPlayFill className="w-4 md:w-7 text-black mr-1" />
          Play
        </button>
        <button
          className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            ">
          <BiInfoCircle className="w-4 md:w-7 mr-1" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
