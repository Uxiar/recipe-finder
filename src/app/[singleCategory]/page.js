"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SingleCategory = () => {
  const params = useParams();

  const [SingleCategoryMeals, setSingleCategoryMeals] = useState([]);
  const [filterSingleMeals, setFilterSingleMeals] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.singleCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleCategoryMeals(data.meals);
        setFilterSingleMeals(data.meals);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const CategoryInputHandler = (e) => {
    setInput(e);
    if (!e) {
      setFilterSingleMeals(SingleCategoryMeals);
    }
    const filterSearch = SingleCategoryMeals.filter((item) =>
      item?.strMeal?.toLowerCase().startsWith(e.toLowerCase())
    );

    setFilterSingleMeals(filterSearch);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mt-4">
        Category: {params.singleCategory}
      </h1>
      <div className=" flex gap-2 items-center  justify-center">
        <input
          value={input}
          onChange={(e) => CategoryInputHandler(e.target.value)}
          type="text"
          className="rounded-xl  bg-slate-300  px-6 py-1 text-black outline-0"
          placeholder="search recipe"
        />

        <IoSearchSharp />
      </div>
      <div className="grid grid-cols-4 gap-3 gap-y-10 place-items-center">
        {filterSingleMeals?.map((item) => (
          <Link
            href={`${params?.singleCategory}/${item?.strMeal}`}
            key={item?.idMeal}
          >
            <Image
              src={item?.strMealThumb}
              height={200}
              width={200}
              alt={item?.strMeal}
              className="rounded-xl"
            />
            <p className="text-center text-xl line-clamp-1 font-bold">
              {item?.strMeal}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
