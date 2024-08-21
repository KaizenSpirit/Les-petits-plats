import CookFactory from '../../dropdowns-factory/cook-factory.js';
import addOptionCloseButton from './add-close-icon.js';
import userSelectedDropdownsOptions from './dropdown-filters.js';

function capitalizeFistLetter(text) {
  if (typeof text !== 'string') {
    return text;
  }
  return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function initializeDropdownOptions(recipes) {
  const allItems = {
    ingredient: new Set(),
    appliance: new Set(),
    ustensile: new Set()
  };

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const ingredient = new CookFactory(ing.ingredient, 'ingredient');
      allItems.ingredient.add(capitalizeFistLetter(String(ingredient.ingredient)));
    });

    const appliance = new CookFactory(recipe.appliance.appliance, 'appliance');
    if (appliance.appliance && typeof appliance.appliance === 'string') {
      allItems.appliance.add(capitalizeFistLetter(String(appliance.appliance)));
    }

    recipe.ustensils.forEach(ust => {
      const ustensil = new CookFactory(ust, 'ustensile');
      if (typeof ustensil[0].ustensile === 'string') {
        allItems.ustensile.add(capitalizeFistLetter(String(ustensil[0].ustensile)));
      }
    });
  });

  fillDropdownOptions('#ingredients-list', Array.from(allItems.ingredient), 'ingredient');
  fillDropdownOptions('#appliances-list', Array.from(allItems.appliance), 'appliance');
  fillDropdownOptions('#ustensils-list', Array.from(allItems.ustensile), 'ustensile');
}

function fillDropdownOptions(containerId, optionsList, type) {
  const container = document.querySelector(containerId);
  container.innerHTML = '';

  optionsList.forEach(option => {
    let htmlContent = '';
    const factoryInstance = new CookFactory(option, type);

    if (type === 'ingredient' || type === 'appliance') {
      htmlContent = factoryInstance.generateDropdown();
    } else if (type === 'ustensile') {
      factoryInstance.forEach(ust => {
        htmlContent += ust.generateDropdown();
      });
    }

    const dropdownOption = document.createElement('div');
    dropdownOption.classList.add('dropdown-option');
    dropdownOption.innerHTML = htmlContent;

    container.appendChild(dropdownOption);

    if (userSelectedDropdownsOptions[type].includes(option)) {
      dropdownOption.classList.add('selected');
      const closeIcon = dropdownOption.querySelector('.close-icon');
      if (closeIcon) {
        closeIcon.style.display = 'block';
      }
    }

    addOptionCloseButton(dropdownOption, type);
  });
}


export default initializeDropdownOptions;