import selectedOptions from './dropdownFilters.js';
import CookFactory from '../dropdownsFactory/cookFactory.js';
import addOptionEventListeners from './addCloseIcone.js';

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

  const uniqueIngredients = removeDuplicates(allIngredients.map(ingredient => capitalize(ingredient)));
  const uniqueAppliances = removeDuplicates(allAppliances.map(appliance => capitalize(appliance)));
  const normalizedUstensils = allUstensils.filter(ustensil => typeof ustensil === 'string').map(ustensil => capitalize(ustensil));
  const uniqueUstensils = removeDuplicates(normalizedUstensils);

  populateDropdownOptions('#ingredients-list', uniqueIngredients, 'ingredient');
  populateDropdownOptions('#appliances-list', uniqueAppliances, 'appliance');
  populateDropdownOptions('#ustensils-list', uniqueUstensils, 'ustensile');
}

function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

function capitalize(text) {
  return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function populateDropdownOptions(containerId, optionsList, type) {
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

    const optionElement = document.createElement('div');
    optionElement.classList.add('dropdown-option');
    optionElement.innerHTML = htmlContent;

    addOptionEventListeners(optionElement, type);
    container.appendChild(optionElement);
  });

  optionsList.forEach(option => {
    Array.from(container.children).forEach(optionElement => {
      const optionText = optionElement.textContent.trim();
      if (optionText === option && selectedOptions[type].includes(option)) {
        optionElement.classList.add('selected');
        const closeIcon = optionElement.querySelector('.close-icon');
        if (closeIcon) {
          closeIcon.style.display = 'block';
        }
      }
    });
  });
}

export default updateDropdownOptions;
