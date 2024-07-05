class RecipeCard {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
    }

    generateIngredientsHtml() {
        return this.ingredients.map(ing =>
            `<div class="ingredient-item">
                <span class="ingredient-name">${ing.ingredient}</span>
                <span class="ingredient-quantity">${ing.quantity || ''} ${ing.unit || ''}</span>
            </div>`
        ).join('');
    }

    renderCards() {
        const ingredientsHtml = this.generateIngredientsHtml();
        return `
            <figure class="recipe-card position-relative m-t-4">
                <img src="./../assets/img/images/${this.image}" alt="${this.name}">
                <div class="time-label">${this.time}min</div>
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
                        ${ingredientsHtml}
                    </div>
                </figcaption>
            </figure>
        `;
    }
}

export default RecipeCard;
