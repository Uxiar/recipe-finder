"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import loader from "../../../../public/loader.gif";

const SingleRegion = () => {
  const router = useRouter();

  const [singleRegion, setSingleregion] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [input, setInput] = useState("");
  const [secoundData, setSecounData] = useState(null);
  const [id, setId] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.singleRegion}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleregion(data?.meals);
        setFilteredMeals(data?.meals);
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSecounData(data?.meals[0]);
        });
    }
  }, [id]);

  useEffect(() => {
    if (secoundData) {
      const category = secoundData?.strCategory;
      const mealid = secoundData?.idMeal;
      router.push(`/category/${category}/${mealid}`);
    }
  }, [secoundData, router]);

  const HandleSecoundApi = (item) => {
    setId(item?.idMeal);
  };

  const handleInputChange = (e) => {
    setInput(e);
    if (!e) {
      setFilteredMeals(singleRegion);
    }
    const filterSearch = singleRegion.filter((item) =>
      item?.strMeal?.toLowerCase().startsWith(e.toLowerCase())
    );
    setFilteredMeals(filterSearch);
  };

  if (singleRegion.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Image src={loader} height={100} width={100} alt="loading.." />
      </div>
    );
  }

  return (
    <div className="relative p-6 md:p-10 bg-black min-h-screen">
      <div className="fixed inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full  object-cover opacity-50"
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>
      <div className="relative z-100">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4 text-center">
          Region: {params.singleRegion}
        </h1>
        <div className="flex items-center justify-center mb-6 ">
          <div className=" flex gap-4 items-center  justify-center my-4 px-4 py-1 rounded-4xl outline-2 outline-amber-400 hover:outline-amber-600 transition duration-300">
            <IoSearchSharp className="h-8 w-8 text-orange-400" />

            <input
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              type="text"
              className=" py-3 pr-20 outline-none  text-orange-300 placeholder-orange-300"
              placeholder={`search ${params.singleRegion} Recipe`}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-orange-500 text-center mb-6">
          {`All ${params.singleRegion} Recipes`}
        </h2>
        <div className="px-4 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMeals?.map((item) => (
            <div
              onClick={() => HandleSecoundApi(item)}
              key={item?.idMeal}
              className=" border border-white group cursor-pointer flex flex-col items-center backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-md hover:shadow-white hover:bg-white/10 transition-all duration-500"
            >
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={item?.strMealThumb}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={item?.strMeal}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 p-3 rounded-3xl"
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
      </div>
    </div>
  );
};

export default SingleRegion;
