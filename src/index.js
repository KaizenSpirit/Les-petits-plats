import { addInputValidation, sanitizeInput } from './secureInputs/inputSanitizer.js';
import performSearch  from './searchAndDisplay/mainInputSearch.js';
import initializeDropdownOptions from './searchAndDisplay/dropdownsContent.js';
import showDescription from './searchAndDisplay/showDescription.js';


  function displayRecipes(recipes) {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  const recipeCountElement = document.getElementById('recipeCount');
  const messageContainer = document.querySelector('.message-zero-recipes');

  recipeCountElement.textContent = `${recipes.length} recettes`;
  recipesContainer.innerHTML = '';

  if (recipes.length > 0) {
    messageContainer.innerHTML = ''; 
  }

  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
  showDescription()
}

  async function init() {
  const recipes = await initializeDropdownOptions(); 
  
  displayRecipes(recipes); 

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const sanitizedValue = sanitizeInput(e.target.value);
    e.target.value = sanitizedValue;
    performSearch(e, recipes);
  });

  addInputValidation(searchInput);
  
    // Ajouter la validation des entrées pour les dropdowns
    const ingredientInput = document.getElementById('ingredients-search');
    const applianceInput = document.getElementById('appliances-search');
    const ustensilInput = document.getElementById('ustensils-search');
  
    addInputValidation(ingredientInput);
    addInputValidation(applianceInput);
    addInputValidation(ustensilInput);
}

init();

export default displayRecipes