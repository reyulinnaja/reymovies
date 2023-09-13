import React from "react";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { PiMonitorPlay } from "react-icons/pi";
import { BsCameraReels, BsStars, BsCalendar4Week } from "react-icons/bs";
import { useRouter } from "next/router";

interface SidebarItems {
  name: string;
  icon: React.ElementType;
  url: string;
}

const sidebarItems: SidebarItems[] = [
  {
    name: "Home",
    icon: GoHome,
    url: "/",
  },
  {
    name: "Movies",
    icon: BsCameraReels,
    url: "/movies",
  },
  {
    name: "TV Series",
    icon: PiMonitorPlay,
    url: "/tvseries",
  },
  {
    name: "Upcoming",
    icon: BsCalendar4Week,
    url: "/upcoming",
  },
  {
    name: "Favorite",
    icon: BsStars,
    url: "/favorite",
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <section className="fixed left-0 top-0 h-screen max-h-screen w-48 bg-slate-900 pb-16 pt-7">
      <h1 className="text-center text-2xl font-bold text-white">ReyMovies</h1>
      <div className="mt-5 flex flex-col">
        {sidebarItems.map((item, index) => {
          const isActive = router.pathname === item.url;
          return (
            <Link
              key={index}
              href={item.url}
              className={`relative flex w-full items-center gap-3 px-7 py-4  transition-all hover:bg-slate-950/50 ${
                isActive
                  ? "bg-slate-950/50 text-slate-300"
                  : "text-slate-600 hover:text-slate-300 "
              }`}
            >
              <item.icon className="h-5 w-5" />
              <p className="font-semibold">{item.name}</p>
              {isActive && (
                <div className="absolute bottom-0 right-0 top-0 z-50 w-2 bg-slate-800"></div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
