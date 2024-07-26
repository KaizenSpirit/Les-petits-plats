function filterDropdownOptions(inputElement, listElement) {
  inputElement.addEventListener('input', function() {
    const filter = inputElement.value.toLowerCase();
    const options = listElement.querySelectorAll('span');
    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      if (text.includes(filter)) {
        option.style.display = ''; 
      } else {
        option.style.display = 'none';
      }
    });
  });
}

function initDropdownFilters() {
  const ingredientInput = document.querySelector('#ingredients-search');
  const ingredientList = document.querySelector('#ingredients-list');
  const applianceInput = document.querySelector('#appliances-search');
  const applianceList = document.querySelector('#appliances-list');
  const ustensileInput = document.querySelector('#ustensiles-search');
  const ustensileList = document.querySelector('#ustensils-lists');
  if (ingredientInput && ingredientList) {
    filterDropdownOptions(ingredientInput, ingredientList);
  }
  if (applianceInput && applianceList) {
    filterDropdownOptions(applianceInput, applianceList);
  }
  if (ustensileInput && ustensileList) {
    filterDropdownOptions(ustensileInput, ustensileList);
  }
}

document.addEventListener('DOMContentLoaded', initDropdownFilters);
