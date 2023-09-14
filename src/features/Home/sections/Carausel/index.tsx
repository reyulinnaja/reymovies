import React from "react";
import { IMAGE_URL } from "@/constants/config";
import Image from "next/image";
import { BiInfoCircle } from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CarauselMoviesProps, CarauselMovie } from "../../types";

const CarauselMovies = ({ data }: CarauselMoviesProps) => {
  return (
    <section className="relative h-[350px] w-full">
      <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false}>
        {data.map((item: CarauselMovie) => (
          <div key={item.id} className="relative h-[350px] w-full">
            <Image
              src={IMAGE_URL + item.backdrop_path}
              alt={item.title}
              width={1000}
              height={300}
              priority
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-t from-slate-950/80"></div>
            <div className="absolute bottom-8 left-5 text-start">
              <div className="inline-flex items-start gap-2 pb-2">
                <h1 className="text-2xl font-semibold">{item.title} </h1>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>
                        <BiInfoCircle className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More Info</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm">{item.overview}</p>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="absolute left-0 top-0 flex h-[50px] w-full items-center justify-center">
        <p className="rounded-md px-4 py-2 font-bold backdrop-blur-xl">
          Now Playing ✨
        </p>
      </div>
    </section>
  );
};

export default CarauselMovies;
