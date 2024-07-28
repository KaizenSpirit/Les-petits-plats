import addOptionEventListeners  from './addCloseIcone.js';

function filterDropdownOptions(inputElement, listElement,type) {
  inputElement.addEventListener('input', function() {
    const filter = inputElement.value.toLowerCase();
    const options = Array.from(listElement.querySelectorAll('.dropdown-option'));

    const filteredOptions = [];

    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      if (text.includes(filter)) {
        option.style.display = 'block'; // Show matching option
        filteredOptions.push(option);
      } else {
        option.style.display = 'none'; // Hide non-matching option
      }
    });

    // Clear the list and append filtered options to move them to the top
    listElement.innerHTML = '';
    filteredOptions.forEach(option => {
      listElement.appendChild(option);
    });

    // Re-append all options to maintain original order for those that were not hidden
    options.forEach(option => {
      if (!filteredOptions.includes(option)) {
        listElement.appendChild(option);
      }
    });

    // Add event listeners to the filtered options
    filteredOptions.forEach(option => {
      addOptionEventListeners(option,type);
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
    filterDropdownOptions(ingredientInput, ingredientList,'ingredient');
  }
  if (applianceInput && applianceList) {
    filterDropdownOptions(applianceInput, applianceList,'appliance');
  }
  if (ustensileInput && ustensileList) {
    filterDropdownOptions(ustensileInput, ustensileList,'ustensile');
  }
}

initDropdownFilters()
