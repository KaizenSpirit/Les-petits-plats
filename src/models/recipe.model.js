import Ingredient from "./ingredient.model.js";
import Appliance from "./appliance.model.js";
import Ustensile from "./ustensile.model.js";

export class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients.map(ing => new Ingredient(ing));
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = new Appliance(recipe.appliance);
    this.ustensils = recipe.ustensils.map(ust => new Ustensile(ust));
  }

  renderCards() {
    return `
<div class="recipe-card-container">
        <figure class="recipe-card position-relative m-t-4">
          <img src="./../assets/img/images/${this.image}" alt="${this.name}">
          <div class="time-label position-absolute">${this.time}min</div>
          <figcaption class="card-body">
            <h3 class="card-title">${this.name}</h3>
            <section class="section-title-recette">
              <h4>RECETTE</h4>
              <p>${this.description}</p>
            </section>
            <section class="section-title-ingredients">
              <h4>INGRÉDIENTS <span> (pour ${this.servings} portions)</span></h4>
            </section>
            <div class="ingredients">
              ${this.ingredients.map(ingredient => ingredient.generateIngredientRecipeCard()).join('')}
            </div>
          <section class="section-appliance-ustensils">
          <section class="section-title-appliance">
            <h4>APPAREILS</h4>  
            ${this.appliance.generateApplianceRecipeCard()}
          </section>
          <section class="section-title-ustensils">
            <h4>USTENSILES</h4> 
            ${this.ustensils.map(ustensile => ustensile.generateUstensileRecipeCard()).join('')}
          </section>
          </section> 
          </figcaption>
        </figure>
        </div>
    `;
  }
}

export default Recipe;
