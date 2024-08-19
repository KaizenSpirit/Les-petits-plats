import { addInputValidation, sanitizeInput } from './secureInputs/inputs-sanitizer.js';
import performSearch  from './search-and-display/main-search-input/main-input-search.js';
import initializeDropdownOptions from './search-and-display/dropdowns/dropdowns-content.js';
import fetchRecipes from './api/api.js';

  function displayRecipes(recipes) {
    document.getElementById('recipeCount').textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ""}`;

  if (recipes.length > 0) {
    document.querySelector('.message-zero-recipes').innerHTML = ''; 
  }

  const recipesContainer = document.querySelector('.recipes-liste .container');
  recipesContainer.innerHTML = '';
  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
}

  async function init() {
  const recipes = await fetchRecipes();
  initializeDropdownOptions(recipes);
  displayRecipes(recipes); 
  
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', (e) => {
    e.target.value = sanitizeInput(e.target.value);
    performSearch(e, recipes);
  });
    addInputValidation(searchInput);
    addInputValidation(document.getElementById('ingredients-search'));
    addInputValidation(document.getElementById('appliances-search'));
    addInputValidation(document.getElementById('ustensils-search'));
}

init();

export default displayRecipes