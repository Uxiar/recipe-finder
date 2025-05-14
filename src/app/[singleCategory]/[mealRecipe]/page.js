"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();

  const [recipeData, setRecipeData] = useState([]);
  console.log(recipeData);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${params.mealRecipe}`
    )
      .then((res) => res.json())
      .then((data) => setRecipeData(data?.meals));
  }, []);

  const ingridients = [];

  for (let i = 1; i <= 20; i++) {
    const ingridient = recipeData[0]?.[`strIngredient${i}`];
    if (ingridient && ingridient.trim("") !== "") {
      ingridients.push(ingridient);
    }
  }
  console.log(ingridients);

  return (
    <>
      <div>
        {recipeData.map((item) => (
          <div key={item.idMeal}>
            <h1>{item.strMeal}</h1>
            <Image
              src={item.strMealThumb}
              height={200}
              width={200}
              alt={item.strMeal}
            />
            <p>ingridients</p>
            <p>1 {item.strIngredient1}</p>
            <p>1 {item.strIngredient1}</p>
            <p>1 {item.strIngredient1}</p>
            <p>1 {item.strIngredient1}</p>
            <p>1 {item.strIngredient1}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
