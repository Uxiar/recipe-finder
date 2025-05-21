"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleRegion = () => {
  const router = useRouter();

  const [singleRegion, setSingleregion] = useState([]);
  const [secoundData, setSecounData] = useState(null);
  const [id, setId] = useState(null);
  console.log(secoundData);

  const params = useParams();
  console.log(params.singleRegion);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.singleRegion}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleregion(data?.meals);
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
    console.log(id);
  };

  return (
    <>
      <div className="p-6 md:p-10 bg-white min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4 text-center">
          {`${params.singleRegion} Recipes`}
        </h1>
        <div className="grid grid-cols-4 gap-5 ">
          {singleRegion?.map((item) => (
            <div
              onClick={() => HandleSecoundApi(item)}
              key={item?.idMeal}
              className="flex flex-col items-center justify-center"
            >
              <Image
                className="rounded-2xl"
                src={item?.strMealThumb}
                alt={item?.strMeal}
                height={200}
                width={200}
              />
              <p>{item?.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleRegion;
