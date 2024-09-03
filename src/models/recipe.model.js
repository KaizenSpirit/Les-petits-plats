import Ingredient from "./ingredient.model.js";
import Appliance from "./appliance.model.js";
import Ustensile from "./ustensile.model.js";

export class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = [];
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = new Appliance(recipe.appliance);
    this.ustensils = [];

  //FOR LOOP USED
      for (let i = 0; i < recipe.ingredients.length; i++) {
      const ing = recipe.ingredients[i];
      this.ingredients.push(new Ingredient(ing.ingredient, ing.quantity, ing.unit));
    }
    
    for (let i = 0; i < recipe.ustensils.length; i++) {
      const ust = recipe.ustensils[i];
      this.ustensils.push(new Ustensile(ust));
    }
  }

  renderCards() {
    let ingredientsRecipeCard = '';
    for (let i = 0; i < this.ingredients.length; i++) {
    ingredientsRecipeCard += this.ingredients[i].generateIngredientRecipeCard();
}

    let ustensilsRecipeCard = '';
    for (let i = 0; i < this.ustensils.length; i++) {
    ustensilsRecipeCard += this.ustensils[i].generateUstensileRecipeCard();
}
    return `
<article class="recipe-card-container">
  <figure class="recipe-card position-relative m-t-4">
    <img src="./../assets/img/images/${this.image}" alt="${this.name}">
      <span class="time-label position-absolute">${this.time}min</span>
        <figcaption class="card-body">
            <h3 class="card-title">${this.name}</h3>
            <section class="section-title-recette">
              <h4>RECETTE</h4>
              <p>${this.description}</p>
            </section>
            <section class="section-title-ingredients">
              <h4>INGRÉDIENTS <span> (pour ${this.servings} portion${this.servings > 1 ? 's' : ""})</span></h4>
                  <div class="ingredients">
                    ${ingredientsRecipeCard}
                  </div>
            </section>
            <section class="section-appliance-ustensils">
            <section class="section-title-appliance">
            <h4>APPAREILS</h4>  
            ${this.appliance.generateApplianceRecipeCard()}
            </section>
            <section class="section-title-ustensils">
                <h4>USTENSILES</h4> 
                ${ustensilsRecipeCard}
            </section>
          </section> 
        </figcaption>
  </figure>
</article>
    `;
  }
}

export default Recipe;
