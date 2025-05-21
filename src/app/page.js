import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-4 h-screen text-slate-700">
      <Link className="bg-white px-4 py-2 rounded-2xl" href={"/category"}>
        All Category
      </Link>
      <Link className="bg-white px-4 py-2 rounded-2xl" href={"/search"}>
        Recipes by Region
      </Link>
      <Link className="bg-white px-4 py-2 rounded-2xl" href={"/randomrecipe"}>
        Random Recipe{" "}
      </Link>
      <Link className="bg-white px-4 py-2 rounded-2xl" href={"/regions"}>
        All Regions{" "}
      </Link>
      <Link className="bg-white px-4 py-2 rounded-2xl" href={"/ingridients"}>
        search by ingridients{" "}
      </Link>
    </div>
  );
};

export default Home;
