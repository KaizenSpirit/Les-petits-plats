import createTag from "./createTags.js";
import removeTag from "./removeTags.js"

function addOptionCloseEventListeners(optionElement, type) {
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
      if (!optionElement.classList.contains('selected')) {
        optionElement.classList.add('selected');
        closeIcon.style.display = 'block';
        createTag(optionElement, type);
      }
    }
  });
}

export default addOptionCloseEventListeners;