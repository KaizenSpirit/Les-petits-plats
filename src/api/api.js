async function fetchRecipes() {
    const response = await fetch('/dataJson/recipes.json');
    const recipes = await response.json();
    return recipes;
}

export default fetchRecipes