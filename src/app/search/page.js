"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [Button, setButton] = useState("Indian");
  const [isActive, setIsActive] = useState(false);
  const [secoundData, setSecoundData] = useState(null);
  const [id, setId] = useState(null);

  const countries = [
    "Canadian",
    "British",
    "Egyptian",
    "French",
    "Italian",
    "Mexican",
    "Spanish",
    "Moroccan",
    "Portuguese",
    "Russian",
  ];

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Button}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data?.meals);
      });
  }, [Button]);

  const inputHandler = (e) => {
    const val = e.target.value;
    const capitalized =
      val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    setInput(capitalized);
  };

  const ButtonHandler = () => {
    if (input.trim()) {
      setButton(input);
      setInput("");
    }
  };

  const SuggesttionHandler = (country) => {
    setIsActive(true);
    setButton(country);
  };

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSecoundData(data?.meals[0]);
        });
    }
  }, [id]);

  useEffect(() => {
    if (secoundData) {
      const category = secoundData?.strCategory;
      const mealid = secoundData?.idMeal;
      router.push(`category/${category}/${mealid}`);
    }
  }, [secoundData, router]);

  const HandleSecoundApi = (item) => {
    setId(item?.idMeal);
  };

  return (
    <div className="relative p-6 md:p-10 bg-black min-h-screen">
      <div className="fixed inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full   object-cover opacity-50"
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>
      <div className="relative max-w-6xl mx-auto z-100">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Discover Regional Recipes
          </h1>
          <p className="text-orange-400 max-w-2xl mx-auto">
            Explore authentic dishes from around the world
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-orange-400" />
            </div>
            <input
              type="text"
              value={input}
              onChange={inputHandler}
              placeholder="Search by region (e.g., Italian, Mexican)"
              className="w-full pl-14 pr-32 py-4 rounded-full border-2 border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 text-orange-800 placeholder-orange-300"
              onKeyPress={(e) => e.key === "Enter" && ButtonHandler()}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300"
              onClick={ButtonHandler}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-xl font-semibold text-orange-500 mb-4 text-center">
            Popular Cuisines
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, index) => (
              <button
                key={index}
                onClick={() => SuggesttionHandler(country)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive && Button === country
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-orange-500 text-white hover:bg-orange-700 shadow"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
            {Button} Recipes
          </h2>

          {data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {data?.map((item) => (
                <div
                  key={item?.idMeal}
                  onClick={() => HandleSecoundApi(item)}
                  className="border border-white group cursor-pointer flex flex-col items-center backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-md hover:shadow-white transition-all duration-500"
                >
                  <div className="relative w-full h-60 overflow-hidden ">
                    <Image
                      className="object-cover group-hover:scale-105 transition-transform duration-500 p-3 rounded-3xl"
                      src={item?.strMealThumb}
                      alt={item?.strMeal}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 w-full text-center">
                    <h3 className="text-xl font-semibold text-orange-500 group-hover:text-white transition-colors duration-300">
                      {item?.strMeal}
                    </h3>
                    <button className="mt-3 px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-orange-400 text-lg">
                No recipes found for this region. Try another search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
