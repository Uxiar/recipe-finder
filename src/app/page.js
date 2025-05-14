"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [filterCategories, setFilterCategories] = useState(null);

  const fetchCategories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((res) => res.json())
      .then((data) => {
        const filter = data?.categories?.filter(
          (item) => item?.strCategory !== "Pork"
        );

        filter.splice(categories.length - 2, 2);

        setCategories(filter);
        setFilterCategories(filter);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchCategories();
    }, 1000);
  }, []);

  // const filteredCategories = categories.filter((item) => {
  //   return item.strCategory !== "Pork";
  // });

  if (error) {
    return (
      <h1 className="text-red-500 flex items-center justify-center h-screen">
        {error.message}
      </h1>
    );
  }
  if (loading) {
    return (
      <h1 className="flex items-center justify-center h-screen">
        <BounceLoader color="red" />
      </h1>
    );
  }

  const CategoryInputHandler = (e) => {
    setInput(e);
    if (!e) {
      setFilterCategories(categories);
    }
    const filterSeach = categories?.filter((item) =>
      item?.strCategory?.toLowerCase().startsWith(e.toLowerCase())
    );

    setFilterCategories(filterSeach);
  };

  return (
    <>
      <div className="p-10">
        <h1 className="text-center font-bold text-xl my-4">All Categories</h1>
        <div className=" flex gap-2 items-center  justify-center">
          <input
            value={input}
            onChange={(e) => CategoryInputHandler(e.target.value)}
            type="text"
            className="rounded-xl  bg-slate-300  px-6 py-1 text-black outline-0"
            placeholder="search category"
          />

          <IoSearchSharp />
        </div>
        <div className="grid grid-cols-4 place-items-center gap-3">
          {filterCategories?.map((item) => {
            return (
              <Link href={`/${item?.strCategory}`} key={item?.idCategory}>
                <Image
                  src={item?.strCategoryThumb}
                  width={300}
                  height={300}
                  alt={item?.strCategory}
                />
                <p className="text-center">{item?.strCategory}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
