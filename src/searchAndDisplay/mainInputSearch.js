function searchRecipes(recipes, req) {
  req = req.toLowerCase();
  return recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(req) ||
    recipe.description.toLowerCase().includes(req) ||
    recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(req))
  );
}

export default searchRecipes