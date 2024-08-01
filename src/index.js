import performSearch  from './searchAndDisplay/mainInputSearch.js';
import initializeDropdownOptions from './searchAndDisplay/dropdownsContent.js';
import showDescription from './searchAndDisplay/showDescription.js';

  function displayRecipes(recipes) {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  const recipeCountElement = document.getElementById('recipeCount');
  recipeCountElement.textContent = `${recipes.length} recettes`;
  recipesContainer.innerHTML = '';
  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
  showDescription()
}

  async function init() {
  const recipes = await initializeDropdownOptions(); 
  displayRecipes(recipes); 
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => performSearch(e, recipes));
}

init();

export default displayRecipes