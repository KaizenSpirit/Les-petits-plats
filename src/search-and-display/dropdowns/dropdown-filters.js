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

    const filteredOptions = [];

    if (filter === '') {
      options.forEach(option => {
        option.style.display = ''; 
        const optionText = option.textContent.trim();
        option.classList.remove('selected');
        const closeIcon = option.querySelector('.close-icon');
        if (closeIcon) {
          closeIcon.style.display = 'none';
        }
        if (selectedOptions[type].includes(optionText)) {
          option.classList.add('selected');
          if (closeIcon) {
            closeIcon.style.display = 'block';
          }
        }
        addOptionEventListeners(option, type);
      });
      return; 
    }

    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      if (text.includes(filter)) {
        filteredOptions.push(option);
      } else {
        option.style.display = 'none';
      }
    });

    listElement.innerHTML = '';
    filteredOptions.forEach(option => {
      listElement.appendChild(option);
    });

    options.forEach(option => {
      if (!filteredOptions.includes(option)) {
        listElement.appendChild(option);
      }
    });

    filteredOptions.forEach(option => {
      const optionText = option.textContent.trim();
      const closeIcon = option.querySelector('.close-icon');
      if (selectedOptions[type].includes(optionText)) {
        option.classList.add('selected');
        if (closeIcon) {
          closeIcon.style.display = 'block';
        }
      } else {
        option.classList.remove('selected');
        if (closeIcon) {
          closeIcon.style.display = 'none';
        }
      }
      addOptionEventListeners(option, type);
    });
  });
}

function initDropdownFilters() {
  const ingredientInput = document.querySelector('#ingredients-search');
  const ingredientList = document.querySelector('#ingredients-list');
  const applianceInput = document.querySelector('#appliances-search');
  const applianceList = document.querySelector('#appliances-list');
  const ustensileInput = document.querySelector('#ustensils-search');
  const ustensileList = document.querySelector('#ustensils-list');
  
  if (ingredientInput && ingredientList) {
    filterDropdownOptions(ingredientInput, ingredientList, 'ingredient');
  }
  if (applianceInput && applianceList) {
    filterDropdownOptions(applianceInput, applianceList, 'appliance');
  }
  if (ustensileInput && ustensileList) {
    filterDropdownOptions(ustensileInput, ustensileList, 'ustensile');
  }
}

initDropdownFilters();

export default selectedOptions;
