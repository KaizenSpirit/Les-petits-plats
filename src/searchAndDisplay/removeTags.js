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
      correspondingOption.querySelector('.close-icon').style.display = 'none';
    }
    tagsContainer.removeChild(tag);
  }
}

export default removeTag