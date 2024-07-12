class Ingredient {
  /**
   * Crée une instance d'Ingredient.
   * @param {Object} data - Les données de l'ingrédient.
   * @param {string} data.ingredient - Le nom de l'ingrédient.
   * @param {number} [data.quantity] - La quantité de l'ingrédient.
   * @param {string} [data.unit] - L'unité de la quantité.
   */
  
  constructor(data) {
    this.ingredient = data.ingredient;
    this.quantity = data.quantity;
    this.unit = data.unit;
  }

  /**
   * Génère le HTML pour l'affichage de l'ingrédient.
   * @function generateIngredient
   * @returns {string} Le HTML de l'ingrédient.
   */
  generateIngredient() {
    return `<div class="ingredient-item">
              <span class="ingredient-name">${this.ingredient}</span>
              <span class="ingredient-quantity">${this.quantity || ''} ${this.unit || ''}</span>
            </div>`;
  }
}

export default Ingredient;