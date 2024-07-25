import fetchRecipes from './api/api.js'

export async function loadAndDisplayRecipes() {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  recipesContainer.innerHTML = ''; 
  const recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
}

loadAndDisplayRecipes();
