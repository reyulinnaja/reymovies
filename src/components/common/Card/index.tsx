import Image from "next/image";
import { IMAGE_URL_CARD } from "@/constants/config";
import { BsFillStarFill } from "react-icons/bs";
import { CardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CardTypes extends CardProps {
  addFavorite: () => void;
  removeFavorite: () => void;
}

const Card = ({
  id,
  poster_path,
  title,
  original_name,
  release_date,
  first_air_date,
  vote_average,
  addFavorite,
  favorite,
  removeFavorite,
}: CardTypes) => {
  return (
    <div
      key={id}
      className="group relative rounded-xl transition-all duration-200 hover:-translate-y-2"
    >
      <Image
        src={
          poster_path !== null
            ? IMAGE_URL_CARD + poster_path
            : "/images/image-not-found.jpg"
        }
        alt={title ? title : original_name}
        width={300}
        height={500}
        className="h-full w-full rounded-xl object-cover"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-0 z-50 cursor-default opacity-0 transition-opacity group-hover:cursor-pointer group-hover:opacity-100 "
              onClick={favorite ? removeFavorite : addFavorite}
            >
              {favorite ? (
                <MdFavorite className="h-6 w-6 text-white" />
              ) : (
                <MdFavoriteBorder className="h-6 w-6 text-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{favorite ? "Remove Favorite" : "Add to Favorite"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-900/60 transition-all duration-300 group-hover:from-slate-900/70"></div>
      <div className="absolute bottom-3 left-3">
        <h1 className="line-clamp-2 font-semibold">
          {title ? title : original_name}
        </h1>
        {release_date || first_air_date ? (
          <p className="text-sm font-medium">
            {(release_date || first_air_date).slice(0, 4)}
          </p>
        ) : null}
        <div className="flex items-center gap-2">
          <BsFillStarFill className="h-4 w-4 text-amber-500" />
          <p className="text-sm font-medium">{vote_average} / 10</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
