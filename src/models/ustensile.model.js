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
    return `<div class="ustensile-item-dropdown dropdown-option">
              <span class="ustensile-name-dropdown">${this.ustensile}<i class="fa-solid fa-circle-xmark close-icon" style="display: none;"></i></span>
            </div>`;
  }
}

export default Ustensile;


