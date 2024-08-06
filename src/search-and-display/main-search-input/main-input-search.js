import displayRecipes  from "../../index.js";
import fetchRecipes from '../../api/api.js';
import selectedOptions from '../dropdowns/dropdown-filters.js';
import { getMainSearchValue, displayNoRecipesMessage } from "./no-recipes-message.js";
import initializeDropdownOptions from "../dropdowns/dropdowns-content.js";

export async function filterRecipes() {
  const recipes = await fetchRecipes();
  const mainSearchValue = getMainSearchValue();

  const selectedTags = [
    ...selectedOptions.ingredient,
    ...selectedOptions.appliance,
    ...selectedOptions.ustensile
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const ingredientsMatch = selectedOptions.ingredient.every(ing =>
      recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase() === ing.toLowerCase())
    );
    const appliancesMatch = selectedOptions.appliance.every(app =>
      recipe.appliance.appliance.toLowerCase() === app.toLowerCase()
    );
    const ustensilsMatch = selectedOptions.ustensile.every(ust =>
      recipe.ustensils.some(recipeUst => recipeUst.ustensile && recipeUst.ustensile.toLowerCase() === ust.toLowerCase())
    );

    const mainSearchMatch = recipe.name.toLowerCase().includes(mainSearchValue) ||
      recipe.description.toLowerCase().includes(mainSearchValue) ||
      recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(mainSearchValue)) ||
      recipe.appliance.appliance.toLowerCase().includes(mainSearchValue) ||
      recipe.ustensils.some(ust => ust.ustensile.toLowerCase().includes(mainSearchValue));

    return ingredientsMatch && appliancesMatch && ustensilsMatch && (mainSearchValue.length < 3 || mainSearchMatch);
  });

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


