
class Ingredient { // créer un modèle
  constructor(data){
    this.ingredient = data.ingredient 
    this.quantity = data.quantity
    this.unit = data.unit
  }

  generateIngredient(){
    return `<div class="ingredient-item">
              <span class="ingredient-name">${this.ingredient}</span>
              <span class="ingredient-quantity">${this.quantity || ''} ${this.unit || ''}</span>
            </div>`
  }
}

export default Ingredient