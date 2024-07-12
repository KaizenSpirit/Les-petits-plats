import Recipe from '../model/recipe.model.js';

/**
 * Récupère les recettes depuis un fichier JSON.
 * @async
 * @function fetchRecipes
 * @returns {Promise<Array>} La liste des recettes.
 */

async function fetchRecipes() {
    const response = await fetch('/dataJson/recipes.json');
    const recipesData = await response.json();
    const recipes = recipesData.map(recipe => new Recipe(recipe));
    return recipes;
}

export default fetchRecipes;