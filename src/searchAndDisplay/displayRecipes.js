import fetchRecipes from '../api/api.js';
import searchRecipes from './mainInputSearch.js';

function displayRecipes(recipes) {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  const recipeCountElement = document.getElementById('recipeCount');
  recipeCountElement.textContent = `${recipes.length} recettes`;
  recipesContainer.innerHTML = '';
  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
}

async function init() {
  const recipes = await fetchRecipes();
  displayRecipes(recipes); 
  const searchInput = document.getElementById('searchInput');

  function performSearch(e) {
    const req = e.target.value;
    if (req.length < 3) {
      displayRecipes(recipes); 
    } else {
      const filteredRecipes = searchRecipes(recipes, req);
      displayRecipes(filteredRecipes);
    }
  }
  searchInput.addEventListener('input', (e) => performSearch(e));
}

init();











