import createTag from "../create-remove-tags/create-tags.js";
import removeTag from "../create-remove-tags/remove-tags.js";
import userSelectedDropdownsOptions from './dropdown-filters.js';
import filterRecipes from '../main-search-input/main-input-search.js';

function addOptionCloseButton(dropDownOption, type) {
  if (!userSelectedDropdownsOptions[type]) return;

  dropDownOption.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.classList.contains('close-icon') && userSelectedDropdownsOptions[type].includes(dropDownOption.textContent.trim())) {
      removeTag(dropDownOption, type);
      dropDownOption.classList.remove('selected');
      dropDownOption.querySelector('.close-icon').style.display = 'none';
      userSelectedDropdownsOptions[type] = userSelectedDropdownsOptions[type].filter(item => item !== dropDownOption.textContent.trim());
    } else if (!userSelectedDropdownsOptions[type].includes(dropDownOption.textContent.trim())) {
      dropDownOption.classList.add('selected');
      dropDownOption.querySelector('.close-icon').style.display = 'block';
      createTag(dropDownOption, type);
      userSelectedDropdownsOptions[type].push(dropDownOption.textContent.trim());
    }

    filterRecipes();
  });
}

export default addOptionCloseButton;


