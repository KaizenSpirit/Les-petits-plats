class Ingredient {
  constructor(ingredient, quantity, unit) {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.unit = unit;
  }

  generateIngredientRecipeCard() {
    return `<div class="ingredient-item-card">
              <span class="ingredient-name-card">${this.ingredient}</span>
              <span class="ingredient-quantity">${this.quantity || ''} ${this.unit || ''}</span>
            </div>`;
  }

  generateDropdown() {
    return `<div class="ingredient-item-dropdown dropdown-option">
              <span class="ingredient-name-dropdown">${this.ingredient}<i class="fa-solid fa-circle-xmark close-icon" style="display: none;"></i></span>
            </div>`;
  }

  generateTag() {
    return `<div class="ingredient-item-tag tag custom-tag">
              <span class="ingredient-name-tag">${this.ingredient}<i class="fa-solid fa-circle-xmark close-icon"></i></span>
            </div>`;
  }
}

export default Ingredient;

