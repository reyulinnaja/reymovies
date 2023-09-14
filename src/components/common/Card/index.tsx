import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL_CARD } from "@/constants/config";
import { BsFillStarFill } from "react-icons/bs";
import { CardProps } from "@/types";

interface CardTypes extends CardProps {
  href: string;
}

const Card = ({
  href,
  id,
  poster_path,
  title,
  original_name,
  release_date,
  first_air_date,
  vote_average,
}: CardTypes) => {
  return (
    <Link
      href={href}
      key={id}
      className="group relative rounded-xl transition-all duration-200 hover:-translate-y-2"
    >
      <Image
        src={IMAGE_URL_CARD + poster_path}
        alt={title ? title : original_name}
        width={300}
        height={500}
        objectFit="cover"
        className="rounded-xl"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-900/60 transition-all duration-300 group-hover:from-slate-900/70"></div>
      <div className="absolute bottom-3 left-3">
        <h1 className="line-clamp-2 font-semibold">
          {title ? title : original_name}
        </h1>
        <p className="text-sm font-medium">
          {release_date ? release_date.slice(0, 4) : first_air_date.slice(0, 4)}
        </p>
        <div className="flex items-center gap-2">
          <BsFillStarFill className="h-4 w-4 text-amber-500" />
          <p className="text-sm font-medium">{vote_average} / 10</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
