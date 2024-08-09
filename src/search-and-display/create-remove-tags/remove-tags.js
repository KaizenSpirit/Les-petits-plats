import selectedOptions from '../dropdowns/dropdown-filters.js'
import filterRecipes  from '../main-search-input/main-input-search.js';

export function findCorrespondingOptionClickedToRemove(tagElement, type) {
  const optionLists = {
    'ingredient': '#ingredients-list',
    'appliance': '#appliances-list',
    'ustensile': '#ustensils-list'
  };

  const optionList = document.querySelector(optionLists[type]);
  return Array.from(optionList.querySelectorAll('.dropdown-option')).find(option => option.textContent.trim() === tagElement.textContent.trim());
}

function removeTag(tagElement, type) {
  const tagsContainer = document.getElementById('tags-container');
  const tag = Array.from(tagsContainer.children).find(tag => tag.textContent.trim() === tagElement.textContent.trim());
  if (tag) {
    const correspondingOption = findCorrespondingOptionClickedToRemove(tag, type);
    if (correspondingOption) {
      correspondingOption.classList.remove('selected');
      const closeIcon = correspondingOption.querySelector('.close-icon');
      if (closeIcon) {
        closeIcon.style.display = 'none';
      }
    }
    const optionText = tag.textContent.trim();
    const index = selectedOptions[type].indexOf(optionText);
    if (index !== -1) {
      selectedOptions[type].splice(index, 1);
    }
    tagsContainer.removeChild(tag);
    filterRecipes()
  }
}

export default removeTag