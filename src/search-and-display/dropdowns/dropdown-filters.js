import addOptionCloseEventListeners from './add-close-icon.js';

const selectedOptions = { 
  ingredient: [],
  appliance: [],
  ustensile: []
};

function filterDropdownOptions(inputElement, listElement, type) {
  inputElement.addEventListener('input', function() {
    const filter = inputElement.value.toLowerCase();
    const options = Array.from(listElement.querySelectorAll('.dropdown-option'));

    options.forEach(option => {
      const optionText = option.textContent.trim();
      const isSelected = selectedOptions[type].includes(optionText);
      const text = option.textContent.toLowerCase();
      const shouldShowOption = text.includes(filter) || filter === '';
      option.style.display = shouldShowOption ? '' : 'none';

    if (shouldShowOption) {
        option.classList.toggle('selected', isSelected);
        addOptionCloseEventListeners(option, type); 
      }
    });
  });
}

function initDropdownFilters() {
  const dropdowns = [
    { input: '#ingredients-search', list: '#ingredients-list', type: 'ingredient' },
    { input: '#appliances-search', list: '#appliances-list', type: 'appliance' },
    { input: '#ustensils-search', list: '#ustensils-list', type: 'ustensile' }
  ];

  dropdowns.forEach(({ input, list, type }) => {
    const inputElement = document.querySelector(input);
    const listElement = document.querySelector(list);

    if (inputElement && listElement) {
      filterDropdownOptions(inputElement, listElement, type);
    }
  });
}

initDropdownFilters();

export default selectedOptions;
