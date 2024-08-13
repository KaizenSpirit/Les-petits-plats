const userSelectedDropdownsOptions = { 
  ingredient: [],
  appliance: [],
  ustensile: []
};

function filterDropdownOptions(inputFilterSearch, dropdownOptions) {
  inputFilterSearch.addEventListener('input', function() {
    Array.from(dropdownOptions.querySelectorAll('.dropdown-option')).forEach(option => {
      const shouldShowOption = option.textContent.toLowerCase().includes(inputFilterSearch.value.toLowerCase()) || inputFilterSearch.value === '';
      option.style.display = shouldShowOption ? '' : 'none';
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
    if (document.querySelector(input) && document.querySelector(list)) {
      filterDropdownOptions(document.querySelector(input), document.querySelector(list));
    }
  });
}

initDropdownFilters();

export default userSelectedDropdownsOptions;
