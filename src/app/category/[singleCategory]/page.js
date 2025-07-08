"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import loader from "../../../../public/loader.gif";

const SingleCategory = () => {
  const params = useParams();

  const [singleCategoryMeals, setSingleCategoryMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.singleCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleCategoryMeals(data.meals);
        setFilteredMeals(data.meals);
      })
      .catch((error) => console.log(error.message));
  }, [params.singleCategory]);

  const handleInputChange = (value) => {
    setInput(value);

    if (!value) {
      return setFilteredMeals(singleCategoryMeals);
    }

    const filtered = singleCategoryMeals.filter((item) =>
      item?.strMeal?.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  if (singleCategoryMeals.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Image src={loader} height={100} width={100} alt="loading.." />
      </div>
    );
  }

  return (
    <div className="absolute p-6 md:p-10 bg-black min-h-screen w-full">
      <div className="fixed inset-0 overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-0">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-10 sm:mb-4 text-center">
          Category : {params.singleCategory}
        </h1>

        <div className="flex items-center justify-center mb-6">
          <div className="flex gap-4 items-center px-4 py-1 rounded-4xl border-2 border-amber-400 hover:border-amber-600 transition duration-300">
            <IoSearchSharp className="h-6 w-6 text-orange-400" />
            <input
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              type="text"
              className="bg-transparent py-2 outline-none text-white placeholder-orange-400"
              placeholder={`Search ${params.singleCategory} Recipe`}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-orange-500 text-center mb-6">
          {`All ${params.singleCategory} Recipes`}
        </h2>

        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMeals.map((item) => (
              <Link
                href={`${params?.singleCategory}/${item?.idMeal}`}
                key={item.idMeal}
                className="group border border-white cursor-pointer flex flex-col items-center backdrop-blur-xl rounded-2xl overflow-hidden hover:scale-105 hover:shadow-white transition-all duration-500 hover:bg-white/10"
              >
                <div className="relative w-full h-60 overflow-hidden">
                  <Image
                    src={item.strMealThumb}
                    fill
                    alt={item.strMeal}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 p-3 rounded-2xl group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 w-full text-center">
                  <h3 className="text-xl font-semibold text-white group-hover:text-orange-600 transition-colors duration-300">
                    {item.strMeal}
                  </h3>
                  <button className="mt-3 px-4 py-1.5 bg-orange-600 text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Recipe
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-orange-500 text-lg">No Recipe found!!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCategory;
