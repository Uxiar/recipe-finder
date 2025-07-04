"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import loader from "../../../public/loader.gif";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

const Ingridients = () => {
  const [ingridients, setIngridients] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [input, setInput] = useState("");
  console.log(ingridients);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
      .then((res) => res.json())
      .then((data) => {
        setIngridients(data.meals);
        setFilterData(
          data.meals.filter((item) => item.strIngredient !== "Pork")
        );
      })
      .catch((error) => console.log(error.message));
  }, []);

  const regionHandler = (item) => {
    console.log(item.strArea);
  };

  if (ingridients.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-amber-50">
        <Image src={loader} alt="loader" height={100} width={100} />
      </div>
    );
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!value) {
      setFilterData(ingridients);
      return;
    }

    const filterSearch = ingridients?.filter((item) =>
      item?.strIngredient?.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilterData(filterSearch);
  };

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Explore All Ingredients{" "}
          </h1>
          <p className="text-orange-400 max-w-2xl mx-auto">
            Discover recipes by ingridients from around the world
          </p>
        </div>
        <div className="flex items-center justify-center mb-12">
          <div className=" flex gap-4 items-center  justify-center my-4 px-6 py-1 rounded-4xl outline-2 outline-amber-400 hover:outline-amber-600 transition duration-300">
            <IoSearchSharp className="h-8 w-8 text-orange-400" />

            <input
              value={input}
              onChange={handleInput}
              type="text"
              className=" py-4  outline-none  text-orange-800 placeholder-orange-300"
              placeholder="search Ingridients"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-6 text-center">
            All Regions
          </h2>
          {filterData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filterData?.map((item, index) => (
                <Link
                  href={`/ingridients/${item?.strIngredient}`}
                  onClick={() => regionHandler(item)}
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl hover:shadow-orange-100 transition-all duration-300"
                >
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-orange-800 group-hover:text-orange-600 transition-colors duration-300">
                      {item.strIngredient}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-orange-500 text-lg">
                No ingredients found matching "{input}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ingridients;
