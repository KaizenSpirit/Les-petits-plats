
import { removeDuplicates, capitalize, populateDropdownOptions } from './dropdownsUtils.js';

function updateDropdownOptions(filteredRecipes) {
  const allIngredients = [];
  const allAppliances = [];
  const allUstensils = [];

  filteredRecipes.forEach(recipe => {
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

  populateDropdownOptions('#ingredients-list', uniqueIngredients, 'ingredient');
  populateDropdownOptions('#appliances-list', uniqueAppliances, 'appliance');
  populateDropdownOptions('#ustensils-list', uniqueUstensils, 'ustensile');
}

export default updateDropdownOptions;