import React from "react";
import { MovieDetail } from "../types/movie-detail";

const MovieDetailCard = ({
  title,
  genres,
  rating,
  poster_url,
}: MovieDetail) => {
  return (
    <div className="flex justify-center rounded-lg p-4 bg-[#212121] cursor-pointer">
      <div className="flex flex-col w-full">
        <img src={poster_url} className="h-72 rounded-lg mb-3" />
        <span className="text-main font-semibold text-lg">{title}</span>
        <div className="flex flex-wrap">
          {genres.map((item) => (
            <span className="text-font mr-2 text-sm">{item}</span>
          ))}
        </div>
        <span className="text-font">⭐ {rating}.0</span>
        <span className="text-center p-2 rounded-lg text-main font-semibold bg-[#FEF6EA] mt-3">
          + Watchlist
        </span>
      </div>
    </div>
  );
};

export default MovieDetailCard;
