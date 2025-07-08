import Link from "next/link";
import React from "react";

const Home = () => {
  const menuItems = [
    { title: "All Category", href: "/category", color: "text-orange-500" },
    { title: "Recipes by Region", href: "/search", color: "text-orange-500" },
    { title: "Random Recipe", href: "/randomrecipe", color: "text-orange-500" },
    { title: "All Regions", href: "/regions", color: "text-orange-500" },
    {
      title: "Search by Ingredients",
      href: "/ingridients",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full  h-full object-cover opacity-50"
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>
      <div className="p-10  relative z-10 min-h-screen flex flex-col justify-center items-center gap-12">
        <div className="text-center">
          <h1 className="text-4xl sm:5xl md:text-6xl font-bold text-orange-500 mb-2   animate-pulse">
            Recipe Finder
          </h1>
          <p className="text-white text-xs sm:text-lg md:text-xl opacity-80">
            Discover delicious recipes from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 mb-8  sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <div
                className={`${item.color} border-2 border-white/30 p-6 rounded-2xl shadow-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-white/10 hover:border-orange-500 cursor-pointer backdrop-blur-sm`}
              >
                <span className="text-lg font-semibold">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-5 text-white/60 text-sm">
          Find your next culinary adventure
        </div>
      </div>
    </div>
  );
};

export default Home;
