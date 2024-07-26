import Recipe from '../models/recipe.model.js';

async function fetchRecipes() {
  const response = await fetch('/dataJson/recipes.json');
  const recipesData = await response.json();
  const recipes = recipesData.map(recipe => new Recipe(recipe));
  return recipes;
}

export default fetchRecipes;
