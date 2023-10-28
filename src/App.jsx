import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router';
import './App.css';


import Home from './components/Home';
import Header from './components/Header';
import RecipePage from "./components/RecipePage"

import dummyDataJSON from "/dummyData.js";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [numOfRecipes, setNumOfRecipes] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [avgReadyTime, setAvgReadyTime] = useState(0);
  const [dishType, setDishType] = useState("")

  useEffect(() => {
    getRecipes("healthy");
  },[])

  const average = (arrayToAverage) => {
    let sum = 0;
    for(let avg of arrayToAverage) {
        sum += avg;
    }
    return sum / arrayToAverage.length;

  }

  const onSearch = () => {
    const filterSearchBar = document.getElementById("search-filter");
    const filterRangeBar = document.getElementById("range-filter");

    const filteredRecipesBySearch = (!filterSearchBar.value) ? recipes : recipes.filter((recipe) => {
      const regex = new RegExp(filterSearchBar.value, 'i');
      return regex.test(recipe.title);
    })
    const filteredRecipes = filteredRecipesBySearch.filter((recipe) => recipe.healthScore >= filterRangeBar.value);

    setDisplayedRecipes(filteredRecipes);
  };

  async function getRecipes(searchQuery) {
    let recipeResults = null;

    // if(searchQuery) {
    //   recipeResults = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=20&sort=healthiness`)
    //   .then(response => response.json())
    //   .then(response => { 
    //     setNumOfRecipes(response.totalResults);  
    //     return response.results; }
    //   );
    // }
    // else {
    //   recipeResults = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=healthy&number=20&sort=healthiness`)
    //   .then(response => response.json())
    //   .then(response => {
    //     setNumOfRecipes(response.totalResults);  
    //     return response.results;
    //   });
    // }

    if(recipeResults == null) {
      setRecipes(dummyDataJSON);
      setDisplayedRecipes(dummyDataJSON);
      setDishType(modeOfDishTypes(dummyDataJSON));
      return;
    }

    let recipeIDs = recipeResults.map((result) => result.id);

    let recipesInfo = await fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${recipeIDs.join(",")}`).then(response => response.json());

    setRecipes(recipesInfo);
    setDisplayedRecipes(recipesInfo);
    setDishType(modeOfDishTypes(recipesInfo));

    const readyTimeArray = recipesInfo.map((recipe) => recipe.readyInMinutes);
    const avgPriceArray = recipesInfo.map((recipe) => recipe.pricePerServing / 100);

    setAvgPrice(average(avgPriceArray));
    setAvgReadyTime(average(readyTimeArray));
  }

function modeOfDishTypes(recipes) {
    const dishTypeHashMap = new Map();

    recipes.forEach((recipe) => {
      for(let i = 0; i < recipe.dishTypes.length; i++) {
        if(dishTypeHashMap.has(recipe.dishTypes[i])) {
          dishTypeHashMap.set(recipe.dishTypes[i], dishTypeHashMap.get(recipe.dishTypes[i]) + 1);
        }
        else {
          dishTypeHashMap.set(recipe.dishTypes[i], 0)
        }
      }
    });

    const dishTypesArray = [...dishTypeHashMap.keys()];
    let max = 0;
    let maxValue ="";

    for(let i = 0; i < dishTypesArray.length; i++) {
      if(max < dishTypeHashMap.get(dishTypesArray[i])) {
          max = dishTypeHashMap.get(dishTypesArray[i]);
          maxValue = dishTypesArray[i];
      }
    }

    return maxValue;
  }
    

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header headerLogo="./src/assets/Healthy-Givings-Logo.png" headerTitle="Healthy Givings"/>}>
            <Route index={true} path="/" element={<Home recipes={recipes} displayedRecipes={displayedRecipes} numOfRecipes={numOfRecipes} avgPrice={avgPrice} avgReadyTime={avgReadyTime} dishType={dishType} onSearch={onSearch} />} />
            <Route index={true} path=":recipeID" element={<RecipePage recipes={recipes} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
  );
};

export default App;
