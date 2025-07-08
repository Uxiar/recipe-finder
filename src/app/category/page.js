"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import loader from "../../../public/loader.gif";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [filterCategories, setFilterCategories] = useState("");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => res.json())
      .then((data) => {
        const filter = data?.categories?.filter(
          (item) => item?.strCategory !== "Pork"
        );

        filter.splice(categories.length - 2, 2);

        setCategories(filter);
        setFilterCategories(filter);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (categories.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Image src={loader} alt="loading..." height={100} width={100} />
      </div>
    );
  }

  if (error) {
    return (
      <h1 className="text-red-500 flex items-center justify-center h-screen">
        {error.message}
      </h1>
    );
  }

  const CategoryInputHandler = (e) => {
    setInput(e);
    if (!e) {
      return setFilterCategories(categories);
    }
    const filterSeach = categories?.filter((item) =>
      item?.strCategory?.toLowerCase().startsWith(e.toLowerCase())
    );

    setFilterCategories(filterSeach);
  };

  return (
    <>
      <div className="p-6 md:p-10 relative min-h-screen bg-black overflow-hidden">
        <div className="fixed inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full   object-cover opacity-50"
          >
            <source src="/home.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        </div>
        <div className="mt-10  sm:mt-0 lg:mt-0 md:mt-0 relative z-1000">
          <div className=" relative flex flex-col items-center justify-center mb-10">
            <h1 className=" sm:text-4xl text-2xl font-bold text-orange-600 mb-1 sm:mb-4 text-center">
              Discover All Categories
            </h1>
            <p className="text-orange-400 max-w-2xl mx-auto">
              Explore authentic Categories
            </p>
          </div>
          <div className="flex items-center justify-center mb-12">
            <div className=" flex gap-4 items-center  justify-center my-4 px-6 py-1 rounded-4xl outline-2 outline-amber-400 hover:outline-amber-600 transition duration-300">
              <IoSearchSharp className="h-8 w-8 text-orange-400" />

              <input
                value={input}
                onChange={(e) => CategoryInputHandler(e.target.value)}
                type="text"
                className="w-full py-2 sm:py-3 sm:pr-20  pr-12 outline-none   text-white placeholder-orange-300"
                placeholder="search category (eg.chicken)"
              />
            </div>
          </div>
          {filterCategories.length > 0 ? (
            <div className="px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filterCategories?.map((item) => {
                return (
                  <Link
                    href={`/category/${item?.strCategory}`}
                    key={item?.idCategory}
                    className="group cursor-pointer flex flex-col items-center backdrop-blur-sm  border border-white rounded-2xl overflow-hidden hover:shadow-sm hover:shadow-white transition-all duration-500 hover:bg-white/10 "
                  >
                    <Image
                      className="object-cover group-hover:scale-105 transition-transform duration-500 p-2"
                      src={item?.strCategoryThumb}
                      width={300}
                      height={300}
                      alt={item?.strCategory}
                    />

                    <div className="p-5 w-full text-center">
                      <h3 className="text-xl font-semibold text-white group-hover:text-amber-100 transition-colors duration-300">
                        {item?.strCategory}
                      </h3>
                      <button className="mt-3 px-4 py-1.5 bg-orange-600 text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Category
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-orange-500 text-lg">No category found!!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Category;
