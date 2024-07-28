import { findCorrespondingOptionClickedToRemove } from "./removeTags.js";
import Ingredient from "../models/ingredient.model.js";
import Appliance from "../models/appliance.model.js";
import Ustensile from "../models/ustensile.model.js";
import removeTag from "./removeTags.js";

function createTag(optionElement, type) {
  const tagsContainer = document.getElementById('tags-container');
  let tagElement;
  if (type === 'ingredient') {
    const ingredient = new Ingredient({ ingredient: optionElement.textContent.trim() });
    tagElement = document.createElement('div');
    tagElement.innerHTML = ingredient.generateIngredientsTags();
  } else if (type === 'appliance') {
    const appliance = new Appliance(optionElement.textContent.trim());
    tagElement = document.createElement('div');
    tagElement.innerHTML = appliance.generateAppliancesTags();
  } else if (type === 'ustensile') {
    const ustensile = new Ustensile(optionElement.textContent.trim());
    tagElement = document.createElement('div');
    tagElement.innerHTML = ustensile.generateUstensilsTags();
  }

  tagsContainer.appendChild(tagElement);
  tagElement = tagElement.firstChild;
  tagElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.classList.contains('close-icon')) {
      removeTag(tagElement, type);
      const correspondingOption = findCorrespondingOptionClickedToRemove(tagElement, type);
      if (correspondingOption) {
        correspondingOption.classList.remove('selected');
        correspondingOption.querySelector('.close-icon').style.display = 'none';
      }
    }
  });
}

export default createTag