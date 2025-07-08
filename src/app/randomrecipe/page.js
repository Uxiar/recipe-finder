"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import loaderGif from "../../../public/loader.gif";

const RandomRecipe = () => {
  const [data, setData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.meals?.[0] || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching random recipe:", error);
        setLoading(false);
      });
  }, []);

  const ingredients = [];
  const measures = [];

  if (data) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];

      if (ingredient?.trim()) {
        ingredients.push(ingredient);
        measures.push(measure?.trim() || "");
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Image src={loaderGif} height={100} width={100} alt="Loading..." />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-xl font-semibold">No recipe found!</p>
      </div>
    );
  }

  return (
    <main className="relative mx-auto p-4 md:p-8 bg-black min-h-screen">
      <div className="fixed top-0 bottom-0 overflow-hidden z-0 ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
      </div>

      <div className="px-4 sm:px-0 relative z-10 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">
            {data.strMeal}{" "}
            <span className="text-orange-500">({data.strCategory})</span>
          </h1>
          <p className="text-white italic">{data.strArea} cuisine</p>
        </header>

        <section className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            {showVideo ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    data.strYoutube?.split("v=")[1]
                  }`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 md:h-80 rounded-lg shadow-md"
                />
              </div>
            ) : (
              <div
                className="cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                <Image
                  src={data.strMealThumb}
                  alt={data.strMeal}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md w-full h-64 md:h-80 object-cover group-hover:opacity-90 transition-opacity"
                />
                <p className="text-center mt-2 font-bold text-orange-600">
                  Click to watch video
                </p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 text-orange-500">
              Instructions
            </h2>
            <p className="text-white leading-relaxed whitespace-pre-line">
              {data.strInstructions}
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

        {data.strSource && (
          <footer className="text-right">
            <a
              href={data.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 hover:scale-105 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-300"
            >
              View Recipe Source
            </a>
          </footer>
        )}
      </div>
    </main>
  );
};

export default RandomRecipe;
