import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Card from "./components/Card"
import List from "./components/List"


// Healthy/Affordable Recipes

// # of Recipes based on Query
// Most Common Cuisine Type of All Results
// Avg Price

// Enter Recipe Name Search bar
// Health Score filter (Min Health Score to Max Health Score, 10 increments)


// 20 results per page Default


// Sort the results By Healthinesss?
// Next Page, Previous Page, Page  # Search?

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [numOfRecipes, setNumOfRecipes] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [avgReadyTime, setAvgReadyTime] = useState(0);
  

  useEffect(() => {
    //getRecipes("healthy");
    setRecipes([
      {title: "recipe 1", healthScore: 90, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
      {title: "recipe 2", healthScore: 100, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
      {title: "recipe 3", healthScore: 100, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
      {title: "recipe 4", healthScore: 100, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
    ]
      );
    setDisplayedRecipes([
      {title: "recipe 1", healthScore: 90, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
      {title: "recipe 2", healthScore: 100, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
      {title: "recipe 3", healthScore: 100, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
      {title: "recipe 4", healthScore: 100, pricePerServing: 200, readyInMinutes: 54, diets: ["thai", "american"]},
    ]);
  }, [])

  

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

    const filteredRecipesBySearch = (!filterSearchBar.value) ? recipes : recipes.filter((recipe) => recipe.title.includes(filterSearchBar.value))
    const filteredRecipes = filteredRecipesBySearch.filter((recipe) => recipe.healthScore >= filterRangeBar.value);

    setDisplayedRecipes(filteredRecipes);
  };

  async function getRecipes(searchQuery) {
    let recipeResults = null;

    if(searchQuery) {
      recipeResults = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}&number=20&sort=healthiness`)
      .then(response => response.json())
      .then(response => { 
        setNumOfRecipes(response.totalResults);  
        return response.results; }
      );
    }
    else {
      recipeResults = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=healthy&number=20&sort=healthiness`)
      .then(response => response.json())
      .then(response => {
        setNumOfRecipes(response.totalResults);  
        return response.results;
      });
    }

    if(recipeResults == null)
      return;

    let recipeIDs = recipeResults.map((result) => result.id);

    let recipesInfo = await fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${recipeIDs.join(",")}`).then(response => response.json());

    setRecipes(recipesInfo);
    setDisplayedRecipes(recipesInfo);

    const readyTimeArray = recipesInfo.map((recipe) => recipe.readyInMinutes);
    const avgPriceArray = recipesInfo.map((recipe) => recipe.pricePerServing);

    setAvgPrice(average(avgPriceArray));
    setAvgReadyTime(average(readyTimeArray));
  }

  return (
      <div className="health-container">
        
        <div className="nav-container">
          <Header 
          headerTitle="Healthy Givings"
          headerLogo="https://cdn0.iconfinder.com/data/icons/fruits-and-vegetables-sketchy-icons/128/24-512.png" />
          <NavBar />
        </div>

        <div className="main-container">
          <div className="card-container">
            <Card 
            data={numOfRecipes}
            dataDescription="Total Recipes"
            />
            <Card 
            data={"$"+ avgPrice.toFixed(2)}
            dataDescription="Average Recipe Price"
            />
            <Card 
            data={avgReadyTime}
            dataDescription="Average Ready Time (Minutes)"
            />
          </div>

          <div className="list-container">
            <List 
            dataList={displayedRecipes}
            onSearch={onSearch}
            />
          </div>
       </div>
      </div>
  );
};

export default App
