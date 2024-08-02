import displayRecipes  from "../index.js";
import fetchRecipes from '../api/api.js';
import selectedOptions from './dropdownFilters.js';
import updateDropdownOptions from "./updateDropdownOptions.js";
import { getMainSearchValue, getRandomSuggestions, displayNoRecipesMessage } from "./mainSearchUtils.js";

export async function filterRecipesWithLoop() {
  const recipes = await fetchRecipes();
  const mainSearchValue = getMainSearchValue();
  const filteredRecipes = [];

for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];

const ingredientsMatch = selectedOptions.ingredient.every(ing =>
  recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase().includes(ing.toLowerCase()))
  );

const appliancesMatch = selectedOptions.appliance.every(app =>
  recipe.appliance.appliance.toLowerCase().includes(app.toLowerCase())
);

const ustensilsMatch = selectedOptions.ustensile.every(ust =>
  recipe.ustensils.some(recipeUst => recipeUst.ustensile && recipeUst.ustensile.toLowerCase().includes(ust.toLowerCase()))
);

let mainSearchMatch = false;
if (mainSearchValue.length >= 3) {
  if (recipe.name.toLowerCase().includes(mainSearchValue) ||
    recipe.description.toLowerCase().includes(mainSearchValue) ||
    recipe.appliance.appliance.toLowerCase().includes(mainSearchValue)) {
    mainSearchMatch = true;
} else {
  for (let j = 0; j < recipe.ingredients.length; j++) {
    if (recipe.ingredients[j].ingredient.toLowerCase().includes(mainSearchValue)) {
      mainSearchMatch = true;
          break;
      }
    }
  if (!mainSearchMatch) {
  for (let j = 0; j < recipe.ustensils.length; j++) {
    if (recipe.ustensils[j].ustensile.toLowerCase().includes(mainSearchValue)) {
      mainSearchMatch = true;
      break;
        }
      }
    }
  }
} else {
    mainSearchMatch = true;
}
  if (ingredientsMatch && appliancesMatch && ustensilsMatch && mainSearchMatch) {
      filteredRecipes.push(recipe);
    }
  }

  displayRecipes(filteredRecipes);
  if (filteredRecipes.length === 0) {
    const suggestions = getRandomSuggestions(recipes);
    displayNoRecipesMessage(mainSearchValue, suggestions);
  }
  updateDropdownOptions(filteredRecipes);
}

function performSearchWithLoop(e) {
  const req = e && e.target ? e.target.value : '';
  if (req.length < 3) {
    filterRecipesWithLoop();
  } else {
    filterRecipesWithLoop();
  }
}

export default performSearchWithLoop;


