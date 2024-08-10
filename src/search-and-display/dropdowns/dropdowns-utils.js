import CookFactory from '../../dropdowns-factory/cook-factory.js';
import addOptionCloseEventListeners from './add-close-icon.js';
import selectedOptions from './dropdown-filters.js';

export function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

export function capitalize(text) {
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

    const optionElement = document.createElement('div');
    optionElement.classList.add('dropdown-option');
    optionElement.innerHTML = htmlContent;

    container.appendChild(optionElement);

    if (selectedOptions[type].includes(option)) {
      optionElement.classList.add('selected');
      const closeIcon = optionElement.querySelector('.close-icon');
      if (closeIcon) {
        closeIcon.style.display = 'block';
      }
    }

    addOptionCloseEventListeners(optionElement, type);
  });
}
