import Ingredient from "../../models/ingredient.model.js";
import Appliance from "../../models/appliance.model.js";
import Ustensile from "../../models/ustensile.model.js";
import removeTag from "./remove-tags.js";

function createTag(optionSelectedByUser, type) {
  let tagCreated;
  if (type === 'ingredient') {
    const ingredient = new Ingredient(optionSelectedByUser.textContent.trim());
    tagCreated = document.createElement('div');
    tagCreated.innerHTML = ingredient.generateTag();
  } else if (type === 'appliance') {
    const appliance = new Appliance(optionSelectedByUser.textContent.trim());
    tagCreated = document.createElement('div');
    tagCreated.innerHTML = appliance.generateTag();
  } else if (type === 'ustensile') {
    const ustensile = new Ustensile(optionSelectedByUser.textContent.trim());
    tagCreated = document.createElement('div');
    tagCreated.innerHTML = ustensile.generateTag();
  }

  document.getElementById('tags-container').appendChild(tagCreated);
  tagCreated.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.classList.contains('close-icon')) {
      removeTag(tagCreated, type);
    }
  });
}

export default createTag