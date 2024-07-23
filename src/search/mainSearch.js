import fetchRecipes from '../api/api.js';

/**
 * Affiche les recettes dans le conteneur spécifié.
 * @function displayRecipes
 * @param {Array} recipes - La liste des recettes à afficher.
 */

function displayRecipes(recipes) {
  const recipesContainer = document.querySelector('.recipes-liste .container');
  const recipeCountElement = document.getElementById('recipeCount');
  recipeCountElement.textContent = `${recipes.length} recettes`;

  recipesContainer.innerHTML = '';
  recipes.forEach(recipe => {
    recipesContainer.innerHTML += recipe.renderCards();
  });
}

/**
 * Recherche des recettes correspondant à la requête.
 * @function searchRecipes
 * @param {Array} recipes - La liste des recettes.
 * @param {string} req - La requête de recherche.
 * @returns {Array} Les recettes correspondant à la requête.
 */

function searchRecipes(recipes, req) {
  req = req.toLowerCase();
  return recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(req) ||
    recipe.description.toLowerCase().includes(req) ||
    recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(req))
  );
}

/**
 * Initialise l'application et gère l'événement de clic sur le bouton de recherche.
 * @async
 * @function init
 */

async function init() {
  const recipes = await fetchRecipes();
  displayRecipes(recipes); 
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  /**
   * Effectue une recherche de recettes et les affiche.
   * @function performSearch
   */
  
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
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      performSearch(e);
    }
  });

}

init();