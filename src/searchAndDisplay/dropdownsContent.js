import fetchRecipes from '../api/api.js';
import CookFactory from '../dropdownsFactory/dropFactory.js'

async function loadAndSetOptions() {
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
      allUstensils.push(ust);
    });
  });

  const uniqueIngredients = removeDuplicates(allIngredients);
  const uniqueAppliances = removeDuplicates(allAppliances);
  const uniqueUstensils = removeDuplicates(allUstensils);

  fillDropdownOptions('#ingredients-list', uniqueIngredients, 'ingredient');
  fillDropdownOptions('#appliances-list', uniqueAppliances, 'appliance');
  fillDropdownOptions('#ustensils-list', uniqueUstensils, 'ustensile');

  return recipes;
}

function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

function fillDropdownOptions(containerId, optionsList, type) {
  const container = document.querySelector(containerId);
  container.innerHTML = ''; 

  optionsList.forEach(option => {
    let htmlContent = '';

    const data = {};
    if (type === 'ingredient') {
      data.ingredient = option;
    } else if (type === 'appliance') {
      data.appliance = option;
    } else if (type === 'ustensile') {
      data.ustensils = [option]; 
    }

    const factoryInstance = new CookFactory(data);

    if (type === 'ingredient' && factoryInstance.generateIngredientDropdown) {
      htmlContent = factoryInstance.generateIngredientDropdown();
    } else if (type === 'appliance' && factoryInstance.generateApplianceDropdown) {
      htmlContent = factoryInstance.generateApplianceDropdown();
    } else if (type === 'ustensile' && Array.isArray(factoryInstance)) {
      htmlContent = factoryInstance.map(ust => ust.generateUstensileDropdown()).join('');
    }

    container.innerHTML += htmlContent;
  });
}


export default loadAndSetOptions