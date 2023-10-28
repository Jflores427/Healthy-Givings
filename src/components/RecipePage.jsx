import { useParams } from "react-router-dom";
import "./RecipePage.css"

const RecipePage = (props) => {
    const { recipes } = props;
    let params = useParams();

    const foundRecipe = recipes.filter((recipe) => {
        return recipe.id == params.recipeID
    })[0];

    console.log(foundRecipe.summary);

    const foundSummaryHTML = foundRecipe.summary;
    const foundSummary = foundSummaryHTML.replace(/<[^>]+>/g, '');

    return(
        <div className="recipe-container">
            <h2>{foundRecipe.title}</h2>
            <h3>Health Score: {foundRecipe.healthScore}</h3>
            <h3>Price (per serving) : ${(foundRecipe.pricePerServing / 100).toFixed(2)}</h3>
            <h3>Prep Time: {foundRecipe.readyInMinutes}</h3>
            <h3>Diets: {foundRecipe.diets.join(", ")}</h3>
            <h4>{foundSummary} </h4>
            <img src={foundRecipe.image}></img>
        </div>
    );

};

export default RecipePage;