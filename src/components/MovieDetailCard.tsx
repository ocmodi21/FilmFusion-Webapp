import React from "react";

type MovieDetailProp = {
  title: string;
  poster_url: string;
};

const MovieDetailCard = ({ title, poster_url }: MovieDetailProp) => {
  return (
    <div className="flex justify-center rounded-lg p-4 bg-[#212121] cursor-pointer">
      <div className="flex flex-col w-full">
        <img src={poster_url} className="h-[300px] rounded-lg mb-3" />
        <span className="text-main font-semibold text-lg">{title}</span>
        <span className="text-center p-2 rounded-lg text-main font-semibold bg-[#FEF6EA] mt-3">
          + Watchlist
        </span>
      </div>
    </div>
  );
};

export default MovieDetailCard;
