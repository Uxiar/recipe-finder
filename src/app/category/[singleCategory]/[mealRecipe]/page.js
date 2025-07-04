"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import loaderGif from "../../../../../public/loader.gif";

const SingleMeal = () => {
  const params = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [showVideo, setVideoshow] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(params);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.mealRecipe}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data?.meals || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRecipeData(null);
        setLoading(false);
      });
  }, [params.mealRecipe]); // Fixed dependency to params.mealRecipe

  const ingredients = [];
  const measures = [];

  if (recipeData && recipeData.length > 0) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeData[0]?.[`strIngredient${i}`];
      if (ingredient?.trim()) {
        ingredients.push(ingredient);
      }

      const measure = recipeData[0]?.[`strMeasure${i}`];
      if (measure?.trim()) {
        measures.push(measure);
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ffffffe0]">
        <Image src={loaderGif} height={100} width={100} alt="loading.." />
      </div>
    );
  }

  if (!recipeData || recipeData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-xl font-semibold">No recipe found!</p>
      </div>
    );
  }

  return (
    <main className=" mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
      {recipeData.map((item) => (
        <article key={item.idMeal} className="space-y-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {item.strMeal}{" "}
              <span className="text-orange-600">({item.strCategory})</span>
            </h1>
            <p className="text-gray-600 italic">{item.strArea} cuisine</p>
          </header>

          <section className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              {showVideo ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      item.strYoutube?.split("v=")[1]
                    }`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64 md:h-80 rounded-lg shadow-md"
                  ></iframe>
                </div>
              ) : (
                <div
                  className="cursor-pointer group"
                  onClick={() => setVideoshow(true)}
                >
                  <Image
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md w-full h-64 md:h-80 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <p className="text-center mt-2 text-blue-600 font-medium">
                    Click to watch video
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.strInstructions}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-lg">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800 border-b pb-2">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">
                      {measures[index] && (
                        <span className="font-medium">{measures[index]}</span>
                      )}{" "}
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800 border-b pb-2">
                Measures
              </h3>
              <ul className="space-y-2">
                {measures.map((measure, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    <span className="text-gray-700 font-medium">{measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {item.strSource && (
            <footer className="text-right">
              <a
                href={item.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                View Recipe Source
              </a>
            </footer>
          )}
        </article>
      ))}
    </main>
  );
};

export default SingleMeal;
