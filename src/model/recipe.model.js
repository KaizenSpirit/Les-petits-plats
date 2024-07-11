import Ingredient from "./ingredient.model.js";

export class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = recipe.ingredients.map(ing => new Ingredient(ing))
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }

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
