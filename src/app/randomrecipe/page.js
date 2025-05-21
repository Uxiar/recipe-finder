"use client";
import React, { useEffect, useState } from "react";
import loader from "../../../public/loader.gif";
import Image from "next/image";

const RandomRecipe = () => {
  const [data, setData] = useState([]);
  const [showVideo, setVideoshow] = useState(false);

  console.log(data);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => setData(data.meals))
      .catch((error) => console.log(error.message));
  }, []);

  const ingridients = [];

  for (let i = 1; i <= 20; i++) {
    const ingridient = data[0]?.[`strIngredient${i}`];
    if (ingridient && ingridient.trim("") !== "") {
      ingridients.push(ingridient);
    }
  }
  const Measures = [];
  for (let i = 1; i <= 20; i++) {
    const measure = data[0]?.[`strMeasure${i}`];
    if (measure && measure.trim("") !== "") {
      Measures.push(measure);
    }
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image src={loader} height={100} width={100} alt="loading.." />
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        {data?.map((item) => (
          <div key={item.idMeal} className="">
            <h1 className="text-2xl font-bold">
              {item.strMeal} ({item.strCategory})
            </h1>
            <p>{item.strArea} dish</p>
            <div className=" my-4 grid grid-cols-2 gap-6">
              {showVideo === false ? (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    onClick={() => setVideoshow(true)}
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    width={400}
                    height={300}
                    className="rounded-md cursor-pointer"
                  />
                  <p className="text-center mt-2">Click to watch video</p>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <iframe
                    width="400px"
                    height="300px"
                    src={`https://www.youtube.com/embed/${
                      item.strYoutube.split("v=")[1]
                    }`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
              )}

              <p>{item.strInstructions}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 items-center justify-center ">
              <div className="flex flex-col items-center justify-center">
                <p className="font-extrabold">Measures</p>
                {Measures.map((item, index) => (
                  <p className="font-extralight" key={index}>
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="font-extrabold">ingridients</p>
                {ingridients.map((item, index) => (
                  <p key={index} className="font-extralight">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <a
              href={item.strSource}
              target="_blank"
              className="flex justify-end font-extrabold"
            >
              Recipe source
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default RandomRecipe;
