// ustensile.model.js
class Ustensile {
  constructor(data) {
    if (typeof data === 'string') {
      this.ustensile = data;
    } else {
      this.ustensile = data.ustensile;
    }
  }

  generateUstensileRecipeCard() {
    return `<div class="ustensile-item-card">
              <span class="ustensile-name-card">${this.ustensile}</span>
            </div>`;
  }

  generateUstensileDropdown() {
    return `<div class="ustensile-item-dropdown">
              <span class="ustensile-name-dropdown">${this.ustensile}</span>
            </div>`;
  }
}

export default Ustensile;

