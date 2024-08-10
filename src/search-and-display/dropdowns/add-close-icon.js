import createTag from "../create-remove-tags/create-tags.js";
import removeTag from "../create-remove-tags/remove-tags.js";
import selectedOptions from './dropdown-filters.js';
import filterRecipes from '../main-search-input/main-input-search.js'

function addOptionCloseEventListeners(optionElement, type) {
  optionElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const closeIcon = optionElement.querySelector('.close-icon');
    const optionText = optionElement.textContent.trim();
    const isSelected = selectedOptions[type].includes(optionText);
    const isCloseIconClicked = e.target.classList.contains('close-icon');
    
    if (isCloseIconClicked && isSelected) {
      // User clicked on the close icon to remove the tag
      removeTag(optionElement, type);
      optionElement.classList.remove('selected');
      closeIcon.style.display = 'none';
      selectedOptions[type] = selectedOptions[type].filter(item => item !== optionText);
    } else if (!isSelected) {
      // User clicked on the option to select it
      optionElement.classList.add('selected');
      closeIcon.style.display = 'block';
      createTag(optionElement, type);
      selectedOptions[type].push(optionText);
    }
      filterRecipes()
  });
}

export default addOptionCloseEventListeners;
