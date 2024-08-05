import { addInputValidation, sanitizeInput } from './secureInputs/inputs-sanitizer.js';
import performSearch  from './search-and-display/main-search-input/main-input-search.js';
import initializeDropdownOptions from './search-and-display/dropdowns/dropdowns-content.js';
import showRecipeText from './search-and-display/main-search-input/show-recipe-text.js';
import fetchRecipes from './api/api.js';

  function displayRecipes(recipes) {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  const recipeCountElement = document.getElementById('recipeCount');
  const messageContainer = document.querySelector('.message-zero-recipes');

  recipeCountElement.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ""}`;
  recipesContainer.innerHTML = '';

  if (recipes.length > 0) {
    messageContainer.innerHTML = ''; 
  }

  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
  showRecipeText()
}

  async function init() {
  const recipes = await fetchRecipes();
  initializeDropdownOptions(recipes);
  displayRecipes(recipes); 
  
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    e.target.value = sanitizedValue;
    performSearch(e, recipes);
  });

  addInputValidation(searchInput);
  
    const ingredientInput = document.getElementById('ingredients-search');
    const applianceInput = document.getElementById('appliances-search');
    const ustensilInput = document.getElementById('ustensils-search');
  
    addInputValidation(ingredientInput);
    addInputValidation(applianceInput);
    addInputValidation(ustensilInput);
}

init();

export default displayRecipes