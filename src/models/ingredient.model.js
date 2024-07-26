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
    return `<div class="ingredient-item-dropdown">
              <span class="ingredient-name-dropdown">${this.ingredient}</span>
            </div>`;
  }
}
export default Ingredient;
