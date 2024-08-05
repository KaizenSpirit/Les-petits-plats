import CookFactory from '../../dropdowns-factory/cook-factory.js';
import { removeDuplicates, capitalize, fillDropdownOptions } from './dropdowns-utils.js';

function initializeDropdownOptions(recipes) {
  const allItems = {
    ingredient: [],
    appliance: [],
    ustensile: []
  };

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const ingredient = new CookFactory(ing.ingredient, 'ingredient');
      allItems.ingredient.push(ingredient.ingredient);
    });

    const appliance = new CookFactory(recipe.appliance.appliance, 'appliance');
    if (appliance.appliance && typeof appliance.appliance === 'string') {
      allItems.appliance.push(appliance.appliance);
    }

    recipe.ustensils.forEach(ust => {
      const ustensil = new CookFactory(ust, 'ustensile');
      if (Array.isArray(ustensil) && ustensil.length > 0 && typeof ustensil[0].ustensile === 'string') {
        allItems.ustensile.push(ustensil[0].ustensile);
      } else if (typeof ust === 'string') {
        allItems.ustensile.push(ust);
      }
    });
  });

  const uniqueIngredients = removeDuplicates(allItems.ingredient.map(item => capitalize(String(item))));
  const uniqueAppliances = removeDuplicates(allItems.appliance.map(item => capitalize(String(item))));
  const uniqueUstensils = removeDuplicates(allItems.ustensile.map(item => capitalize(String(item))));

  fillDropdownOptions('#ingredients-list', uniqueIngredients, 'ingredient');
  fillDropdownOptions('#appliances-list', uniqueAppliances, 'appliance');
  fillDropdownOptions('#ustensils-list', uniqueUstensils, 'ustensile');
}

export default initializeDropdownOptions;