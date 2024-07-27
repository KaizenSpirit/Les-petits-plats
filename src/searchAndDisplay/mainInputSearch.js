import displayRecipes  from "../index.js";

function searchRecipes(recipes, req) {
  req = req.toLowerCase();
  return recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(req) ||
    recipe.description.toLowerCase().includes(req) ||
    recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(req))
  );
}

function performSearch(e, recipes) {
  const req = e.target.value;
  if (req.length < 3) {
    displayRecipes(recipes); 
  } else {
    const filteredRecipes = searchRecipes(recipes, req);
    displayRecipes(filteredRecipes);
  }
}

export default performSearch;


