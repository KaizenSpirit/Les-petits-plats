class Ingredient {
  constructor(data) {
    this.ingredient = data.ingredient;
    this.quantity = data.quantity;
    this.unit = data.unit;
  }

  generateIngredientRecipeCard() {
    return `<div class="ingredient-item-card">
              <span class="ingredient-name-card">${this.ingredient}</span>
              <span class="ingredient-quantity">${this.quantity || ''} ${this.unit || ''}</span>
            </div>`;
  }

  generateIngredientDropdown() {
    return `<div class="ingredient-item-dropdown dropdown-option">
              <span class="ingredient-name-dropdown">${this.ingredient}<i class="fa-solid fa-circle-xmark close-icon" style="display: none;"></i></span>
            </div>`;
  }

  generateIngredientsTags() {
    return `<div class="ingredient-item-tag tag custom-tag">
              <span class="ingredient-name-tag">${this.ingredient}<i class="fa-solid fa-circle-xmark close-icon"></i></span>
            </div>`;
  }
}

export default Ingredient;

