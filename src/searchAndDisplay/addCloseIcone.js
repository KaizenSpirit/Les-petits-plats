function addOptionEventListeners(optionElement,type) {
  optionElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const closeIcon = optionElement.querySelector('.close-icon');
    if (e.target.classList.contains('close-icon')) {
      // Handle removal
      removeTag(optionElement, type);
      optionElement.classList.remove('selected');
      closeIcon.style.display = 'none';
    } else {
      // Handle selection
      optionElement.classList.add('selected');
      closeIcon.style.display = 'block';
      createTag(optionElement, type);
    }
  });
}

function createTag(optionElement, type) {
  const tagsContainer = document.getElementById('tags-container');
  const tagElement = optionElement.cloneNode(true);
  tagElement.classList.remove('dropdown-option'); // Supprime la classe partagée
  tagElement.classList.add('tag', 'custom-tag'); // Ajout de la classe 'custom-tag'
  tagElement.dataset.type = type;
  tagElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.classList.contains('close-icon')) {
      removeTag(tagElement, type);
      const correspondingOption = findCorrespondingOption(tagElement, type);
      if (correspondingOption) {
        correspondingOption.classList.remove('selected');
        correspondingOption.querySelector('.close-icon').style.display = 'none';
      }
    }
  });
  tagsContainer.appendChild(tagElement);
}

function removeTag(tagElement, type) {
  const tagsContainer = document.getElementById('tags-container');
  const tag = Array.from(tagsContainer.children).find(tag => tag.textContent.trim() === tagElement.textContent.trim());
  if (tag) {
    const correspondingOption = findCorrespondingOption(tag, type);
    if (correspondingOption) {
      correspondingOption.classList.remove('selected');
      correspondingOption.querySelector('.close-icon').style.display = 'none';
    }
    tagsContainer.removeChild(tag);
  }
}

function findCorrespondingOption(tagElement, type) {
  const optionLists = {
    'ingredient': '#ingredients-list',
    'appliance': '#appliances-list',
    'ustensile': '#ustensils-list'
  };

  const optionList = document.querySelector(optionLists[type]); 

  return Array.from(optionList.querySelectorAll('.dropdown-option')).find(option => option.textContent.trim() === tagElement.textContent.trim());
 
}

export default addOptionEventListeners