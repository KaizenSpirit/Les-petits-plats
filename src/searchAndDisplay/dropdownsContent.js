import fetchRecipes from '../api/api.js';
import CookFactory from '../dropdownsFactory/dropFactory.js';
import addOptionEventListeners  from './addCloseIcone.js';

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

  const uniqueIngredients = removeDuplicates(allIngredients.map(ingredient => ingredient.toLowerCase().charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()));
  const uniqueAppliances = removeDuplicates(allAppliances.map(appliance => appliance.toLowerCase().charAt(0).toUpperCase() + appliance.slice(1).toLowerCase()));
  const normalizedUstensils = allUstensils.filter(ustensil => typeof ustensil === 'string').map(ustensil => ustensil.toLowerCase().charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase());
  const uniqueUstensils = removeDuplicates(normalizedUstensils);

  populateDropdownOptions('#ingredients-list', uniqueIngredients, 'ingredient');
  populateDropdownOptions('#appliances-list', uniqueAppliances, 'appliance');
  populateDropdownOptions('#ustensils-list', uniqueUstensils, 'ustensile');

  return recipes;
}

function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

function populateDropdownOptions(containerId, optionsList, type) {
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
      factoryInstance.forEach(ust => {
        htmlContent += ust.generateUstensileDropdown();
      });
    }

    const optionElement = document.createElement('div');
    optionElement.classList.add('dropdown-option');
    optionElement.innerHTML = htmlContent;

    addOptionEventListeners(optionElement,type);
    container.appendChild(optionElement);
  });
}


export default initializeDropdownOptions;
