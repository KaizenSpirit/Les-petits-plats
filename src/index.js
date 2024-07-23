import fetchRecipes from './api/api.js'

/**
 * Charge et affiche les recettes.
 * @async
 * @function loadAndDisplayRecipes
 */

export async function loadAndDisplayRecipes() {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  recipesContainer.innerHTML = ''; 
  const recipes = await fetchRecipes();
  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
}

loadAndDisplayRecipes();
