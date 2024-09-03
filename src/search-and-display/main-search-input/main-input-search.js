import displayRecipes  from "../../index.js";
import fetchRecipes from '../../api/api.js';
import userSelectedDropdownsOptions from '../dropdowns/dropdown-filters.js';
import { getMainSearchValue, displayNoRecipesMessage } from "./no-recipes-message.js";
import initializeDropdownOptions from "../dropdowns/dropdowns-creation.js";

export async function filterRecipes() {
  const recipes = await fetchRecipes();
  const mainSearchValue = getMainSearchValue();

  const selectedTags = [
    ...userSelectedDropdownsOptions.ingredient,
    ...userSelectedDropdownsOptions.appliance,
    ...userSelectedDropdownsOptions.ustensile
  ];

  const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

    const ingredientsMatch = userSelectedDropdownsOptions.ingredient.every(ing =>
      recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase() === ing.toLowerCase())
    );
    const appliancesMatch = userSelectedDropdownsOptions.appliance.every(app =>
      recipe.appliance.appliance.toLowerCase() === app.toLowerCase()
    );
    const ustensilsMatch = userSelectedDropdownsOptions.ustensile.every(ust =>
      recipe.ustensils.some(recipeUst => recipeUst.ustensile && recipeUst.ustensile.toLowerCase() === ust.toLowerCase())
    );

   // WHILE LOOP USED
    let isMainSearchInIngredient = false;
    let index = 0;

    while (index < recipe.ingredients.length && !isMainSearchInIngredient) {
    if (recipe.ingredients[index].ingredient) {
      isMainSearchInIngredient = recipe.ingredients[index].ingredient.toLowerCase().includes(mainSearchValue);
    }
    index++;
}

    const mainSearchMatch = recipe.name.toLowerCase().includes(mainSearchValue) ||
    recipe.description.toLowerCase().includes(mainSearchValue) ||
    isMainSearchInIngredient

    if (ingredientsMatch && appliancesMatch && ustensilsMatch && (mainSearchValue.length < 3 || mainSearchMatch)) {
      filteredRecipes.push(recipe);
      }
}

  displayRecipes(filteredRecipes);

  if (filteredRecipes.length === 0) {
    displayNoRecipesMessage(mainSearchValue, selectedTags);
  }

  initializeDropdownOptions(filteredRecipes)
}

function performSearch(e) {
  const req = e && e.target ? e.target.value : ''; 
  if (req.length < 3) {
    filterRecipes();
  } else {
    filterRecipes();
  }
}

export default performSearch;


