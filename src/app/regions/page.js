"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import loader from "../../../public/loader.gif";
import { IoSearchSharp } from "react-icons/io5";

const Regions = () => {
  const [Regions, setRegions] = useState([]);
  const [filterRegions, setFilterregions] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      .then((res) => res.json())
      .then((data) => {
        setRegions(data.meals);
        setFilterregions(data.meals);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const regionHandler = (item) => {
    console.log(item.strArea);
  };

  const AllRegionInputHandler = (e) => {
    const val = e.target.value;
    setInput(val);
    if (!val) {
      return setFilterregions(Regions);
    }
    const filterSeach = Regions.filter((item) =>
      item.strArea.toLowerCase().startsWith(val.toLowerCase())
    );
    setFilterregions(filterSeach);
  };
  if (Regions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Image src={loader} alt="laoding" height={100} width={100} />
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
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>
      <div className=" pt-4 sm:pt-0 z-1000 relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Explore Culinary Regions
          </h1>
          <p className="text-orange-400 max-w-2xl mx-auto">
            Discover authentic cuisines from around the world
          </p>
        </div>
        <div className="flex items-center justify-center mb-12">
          <div className=" flex gap-4 items-center  justify-center my-4 px-6 py-1 rounded-4xl outline-2 outline-amber-400 hover:outline-amber-600 transition duration-300">
            <IoSearchSharp className="h-8 w-8 text-orange-400" />

            <input
              value={input}
              onChange={AllRegionInputHandler}
              type="text"
              className=" py-4  outline-none  text-white placeholder-orange-400"
              placeholder="search Region"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
            All Regions
          </h2>
          {filterRegions.length > 0 ? (
            <div className="p-4 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filterRegions?.map((item, index) => (
                <Link
                  href={`/regions/${item?.strArea}`}
                  onClick={() => regionHandler(item)}
                  key={index}
                  className="group relative overflow-hidden backdrop-blur-sm border border-white rounded-xl shadow-md hover:shadow-md hover:bg-white/10 hover:shadow-white transition-all duration-300"
                >
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-medium text-orange-400 group-hover:text-white transition-colors duration-300">
                      {item.strArea}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-orange-500 text-lg">No region found!!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Regions;
