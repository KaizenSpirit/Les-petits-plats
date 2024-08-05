import addOptionEventListeners from './add-close-icon.js';

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
      const closeIcon = option.querySelector('.close-icon');
      const isSelected = selectedOptions[type].includes(optionText);
      const text = option.textContent.toLowerCase();

      if (text.includes(filter)) {
        option.style.display = '';
        option.classList.toggle('selected', isSelected);
        if (closeIcon) {
          closeIcon.style.display = isSelected ? 'block' : 'none';
        }
      } else if (filter === ''){
        option.classList.remove('selected');
        if (closeIcon) {
          closeIcon.style.display = 'none';
        }
        if (isSelected) {
          option.classList.add('selected');
          if (closeIcon) {
            closeIcon.style.display = 'block';
          }
        }
      }else{
        option.style.display = 'none';
      }
      addOptionEventListeners(option, type);
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
