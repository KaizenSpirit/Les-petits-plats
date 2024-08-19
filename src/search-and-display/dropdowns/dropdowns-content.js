import CookFactory from '../../dropdowns-factory/cook-factory.js';
import { capitalizeDropdownsOptionsFirstLetter, fillDropdownOptions } from './dropdowns-utils.js';

function initializeDropdownOptions(recipes) {
  const allItems = {
    ingredient: new Set(),
    appliance: new Set(),
    ustensile: new Set()
  };

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const ingredient = new CookFactory(ing.ingredient, 'ingredient');
      allItems.ingredient.add(capitalizeDropdownsOptionsFirstLetter(String(ingredient.ingredient)));
    });

    const appliance = new CookFactory(recipe.appliance.appliance, 'appliance');
    if (appliance.appliance && typeof appliance.appliance === 'string') {
      allItems.appliance.add(capitalizeDropdownsOptionsFirstLetter(String(appliance.appliance)));
    }

    recipe.ustensils.forEach(ust => {
      const ustensil = new CookFactory(ust, 'ustensile');
      if (typeof ustensil[0].ustensile === 'string') {
        allItems.ustensile.add(capitalizeDropdownsOptionsFirstLetter(String(ustensil[0].ustensile)));
      }
    });
  });

  fillDropdownOptions('#ingredients-list', Array.from(allItems.ingredient), 'ingredient');
  fillDropdownOptions('#appliances-list', Array.from(allItems.appliance), 'appliance');
  fillDropdownOptions('#ustensils-list', Array.from(allItems.ustensile), 'ustensile');
}

export default initializeDropdownOptions;
