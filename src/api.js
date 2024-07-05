import RecipeCard from './recipeCard.js';

async function fetchRecipes() {
    const response = await fetch('/dataJson/recipes.json');
    const recipes = await response.json();
    return recipes;
}

async function loadAndDisplayRecipes() {
        const recipesContainer = document.querySelector('.recipes-liste .container');
        recipesContainer.innerHTML = ''; 
        const recipes = await fetchRecipes();
        recipes.forEach(recipeData => {
        const recipeCard = new RecipeCard(recipeData);
        recipesContainer.innerHTML += recipeCard.renderCards();
    });
}

loadAndDisplayRecipes();
