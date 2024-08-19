import CookFactory from '../../dropdowns-factory/cook-factory.js';
import addOptionCloseButton from './add-close-icon.js';
import userSelectedDropdownsOptions from './dropdown-filters.js';

export function capitalizeDropdownsOptionsFirstLetter(text) {
  if (typeof text !== 'string') {
    return text;
  }
  return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function fillDropdownOptions(containerId, optionsList, type) {
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
