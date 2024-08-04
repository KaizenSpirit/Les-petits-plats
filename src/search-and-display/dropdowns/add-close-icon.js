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
    if (e.target.classList.contains('close-icon')) {
      removeTag(optionElement, type);
      optionElement.classList.remove('selected');
      if (closeIcon) {
        closeIcon.style.display = 'none';
      }
      const index = selectedOptions[type].indexOf(optionText);
      if (index !== -1) {
        selectedOptions[type].splice(index, 1);
      }
    } else {
      if (!optionElement.classList.contains('selected')) {
        optionElement.classList.add('selected');
        if (closeIcon) {
          closeIcon.style.display = 'block';
        }
        createTag(optionElement, type);
        if (!selectedOptions[type].includes(optionText)) {
          selectedOptions[type].push(optionText);
        }
      }
      filterRecipes()
    }
  });
}

export default addOptionCloseEventListeners;
