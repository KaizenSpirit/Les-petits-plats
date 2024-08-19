const userSelectedDropdownsOptions = { 
  ingredient: [],
  appliance: [],
  ustensile: []
};

const dropdowns = [
  { input: '#ingredients-search', list: '#ingredients-list'},
  { input: '#appliances-search', list: '#appliances-list' },
  { input: '#ustensils-search', list: '#ustensils-list' }
];


function filterDropdownOptions(inputFilterSearch, dropdownOptions) {
  inputFilterSearch.addEventListener('input', function() {
    Array.from(dropdownOptions.querySelectorAll('.dropdown-option')).forEach(option => {
      option.style.display = (option.textContent.toLowerCase().includes(inputFilterSearch.value.toLowerCase()) || inputFilterSearch.value === '') ? '' : 'none';
    });
  });
}

function initDropdownFilters() {
  dropdowns.forEach(({ input, list }) => {
    if (document.querySelector(input) && document.querySelector(list)) {
      filterDropdownOptions(document.querySelector(input), document.querySelector(list));
    }
  });
}

initDropdownFilters();

export default userSelectedDropdownsOptions;
