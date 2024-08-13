import userSelectedDropdownsOptions from '../dropdowns/dropdown-filters.js'
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
  const tag = Array.from(document.getElementById('tags-container').children).find(tag => tag.textContent.trim() === tagElement.textContent.trim());
  if (tag) {
    const correspondingOption = findCorrespondingOptionClickedToRemove(tag, type);
    if (correspondingOption) {
      correspondingOption.classList.remove('selected');
      if (correspondingOption.querySelector('.close-icon')){
        correspondingOption.querySelector('.close-icon').style.display = 'none'
      }
    }
  ;
  userSelectedDropdownsOptions[type] = userSelectedDropdownsOptions[type].filter(item => item !== tag.textContent.trim());

    document.getElementById('tags-container').removeChild(tag);
    filterRecipes()
  }
}

export default removeTag