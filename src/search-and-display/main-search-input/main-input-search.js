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

  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    let ingredientsMatch = true;
    for (let j = 0; j < selectedOptions.ingredient.length; j++) {
      const ing = selectedOptions.ingredient[j].toLowerCase();
      let ingredientFound = false;
      for (let k = 0; k < recipe.ingredients.length; k++) {
        if (recipe.ingredients[k].ingredient.toLowerCase() === ing) {
          ingredientFound = true;
          break;
        }
      }
      if (!ingredientFound) {
        ingredientsMatch = false;
        break;
      }
    }

    let appliancesMatch = true;
    for (let j = 0; j < selectedOptions.appliance.length; j++) {
      if (recipe.appliance.appliance.toLowerCase() !== selectedOptions.appliance[j].toLowerCase()) {
        appliancesMatch = false;
        break;
      }
    }

    let ustensilsMatch = true;
    for (let j = 0; j < selectedOptions.ustensile.length; j++) {
      const ust = selectedOptions.ustensile[j].toLowerCase();
      let ustensilFound = false;
      for (let k = 0; k < recipe.ustensils.length; k++) {
        if (recipe.ustensils[k].ustensile && recipe.ustensils[k].ustensile.toLowerCase() === ust) {
          ustensilFound = true;
          break;
        }
      }
      if (!ustensilFound) {
        ustensilsMatch = false;
        break;
      }
    }

    let mainSearchMatch = false;
    if (recipe.name.toLowerCase().includes(mainSearchValue) ||
        recipe.description.toLowerCase().includes(mainSearchValue)) {
      mainSearchMatch = true;
    } else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].ingredient.toLowerCase().includes(mainSearchValue)) {
          mainSearchMatch = true;
          break;
        }
      }
      if (!mainSearchMatch && recipe.appliance.appliance.toLowerCase().includes(mainSearchValue)) {
        mainSearchMatch = true;
      }
      if (!mainSearchMatch) {
        for (let j = 0; j < recipe.ustensils.length; j++) {
          if (recipe.ustensils[j].ustensile && recipe.ustensils[j].ustensile.toLowerCase().includes(mainSearchValue)) {
            mainSearchMatch = true;
            break;
          }
        }
      }
    }

    if (ingredientsMatch && appliancesMatch && ustensilsMatch && (mainSearchValue.length < 3 || mainSearchMatch)) {
      filteredRecipes.push(recipe);
    }
  }

  displayRecipes(filteredRecipes);

  if (filteredRecipes.length === 0) {
    displayNoRecipesMessage(mainSearchValue, selectedTags);
  }

  initializeDropdownOptions(filteredRecipes);
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


