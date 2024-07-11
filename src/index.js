import Recipe from './model/recipe.model.js';
import fetchRecipes from './api/api.js'

export async function loadAndDisplayRecipes() {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  recipesContainer.innerHTML = ''; 
  const recipes = await fetchRecipes();
  recipes.forEach(recipeData => {
  const recipeCard = new Recipe(recipeData);
  recipesContainer.innerHTML += recipeCard.renderCards();
});
}

loadAndDisplayRecipes(); 