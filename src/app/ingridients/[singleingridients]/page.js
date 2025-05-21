"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleIngidients = () => {
  const router = useRouter();

  const [singleIngridients, setSingleIngridients] = useState([]);
  const [id, setid] = useState(null);
  const [secoundData, setSecounData] = useState(null);
  const params = useParams();
  console.log(singleIngridients);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${params.singleingridients}`
    )
      .then((res) => res.json())
      .then((data) => setSingleIngridients(data.meals));
  }, [params.singleingridients]);

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

  const handleSecoundApi = (item) => {
    setid(item.idMeal);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        meals with {params?.singleingridients}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {singleIngridients?.map((meal) => (
          <div
            onClick={() => handleSecoundApi(meal)}
            key={meal?.idMeal}
            className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={meal?.strMealThumb}
              alt={meal?.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meal?.strMeal}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleIngidients;
