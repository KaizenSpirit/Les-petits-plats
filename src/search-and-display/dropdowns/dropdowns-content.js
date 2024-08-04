import fetchRecipes from '../../api/api.js';
import { removeDuplicates, capitalize, fillDropdownOptions } from './dropdowns-utils.js';

async function initializeDropdownOptions() {
  const recipes = await fetchRecipes();
  const allIngredients = [];
  const allAppliances = [];
  const allUstensils = [];

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      allIngredients.push(ing.ingredient);
    });
    allAppliances.push(recipe.appliance.appliance);
    recipe.ustensils.forEach(ust => {
      if (typeof ust === 'object' && ust.hasOwnProperty('ustensile')) {
        allUstensils.push(ust.ustensile); 
      } else if (typeof ust === 'string') {
        allUstensils.push(ust); 
      }
    });
  });

  const uniqueIngredients = removeDuplicates(allIngredients.map(capitalize));
  const uniqueAppliances = removeDuplicates(allAppliances.map(capitalize));
  const normalizedUstensils = allUstensils.filter(ustensil => typeof ustensil === 'string').map(capitalize);
  const uniqueUstensils = removeDuplicates(normalizedUstensils);

  fillDropdownOptions('#ingredients-list', uniqueIngredients, 'ingredient');
  fillDropdownOptions('#appliances-list', uniqueAppliances, 'appliance');
  fillDropdownOptions('#ustensils-list', uniqueUstensils, 'ustensile');

  return recipes;
}

export default initializeDropdownOptions;