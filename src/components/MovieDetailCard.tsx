import React from "react";
import { ListData } from "../types/list-detail";
import { toast } from "react-toastify";

type MovieDetailProp = {
  id: string;
  title: string;
  poster_url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectMovie: {
    id: string;
    title: string;
    poster_url: string;
  };
  setSelectMovie: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      poster_url: string;
    }>
  >;
  listData: ListData[];
};

const MovieDetailCard = ({
  id,
  title,
  poster_url,
  setOpen,
  setSelectMovie,
  listData,
}: MovieDetailProp) => {
  const handleSelectMovie = () => {
    if (!listData || listData.length === 0) {
      toast.error("List doesnot exists!");
      return;
    }

    setOpen(true);
    setSelectMovie({ id: id, title: title, poster_url: poster_url });
  };

  return (
    <div className="flex justify-center rounded-lg p-4 bg-[#212121] cursor-pointer">
      <div className="flex flex-col w-full">
        <img src={poster_url} className="h-[300px] rounded-lg mb-3" />
        <span className="text-main font-semibold text-lg">{title}</span>
        <span
          onClick={handleSelectMovie}
          className="text-center p-2 rounded-lg text-main font-semibold bg-[#FEF6EA] mt-3"
        >
          + Watchlist
        </span>
      </div>
    </div>
  );
};

export default MovieDetailCard;
