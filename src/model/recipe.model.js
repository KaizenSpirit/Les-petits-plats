import Ingredient from "./ingredient.model.js";

/**
 * Représente une recette.
 * @class
 */

export class Recipe {

  /**
   * Crée une instance de Recipe.
   * @param {Object} recipe - Les données de la recette.
   * @param {number} recipe.id - L'identifiant de la recette.
   * @param {string} recipe.image - L'image de la recette.
   * @param {string} recipe.name - Le nom de la recette.
   * @param {number} recipe.servings - Le nombre de portions.
   * @param {Array} recipe.ingredients - La liste des ingrédients.
   * @param {number} recipe.time - Le temps de préparation.
   * @param {string} recipe.description - La description de la recette.
   * @param {string} recipe.appliance - L'appareil utilisé pour la recette.
   * @param {Array} recipe.ustensils - La liste des ustensiles nécessaires.
   */

  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients.map(ing => new Ingredient(ing));
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
  }

  /**
   * Génère le HTML pour l'affichage de la carte de la recette.
   * @function renderCards
   * @returns {string} Le HTML de la carte de la recette.
   */
  
renderCards() {
return `
    <div class="recipe-card-container">
    <figure class="recipe-card position-relative m-t-4">
        <img src="./../assets/img/images/${this.image}" alt="${this.name}">
        <div class="time-label position-absolute">${this.time}min</div>
        <figcaption class="card-body">
        <h3 class="card-title">${this.name}</h3>
        <div class="section-title-recette">
            <h4>RECETTE</h4>
            <p>${this.description}</p>
        </div>
        <div class="section-title-ingredients">
            <h4>INGRÉDIENTS</h4>
        </div>
        <div class="ingredients">
            ${this.ingredients.map(ingredient => ingredient.generateIngredient()).join('')}
        </div>
        </figcaption>
    </figure>
    </div>
    `;
    }
}

export default Recipe;
