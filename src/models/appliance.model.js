class Appliance {
  constructor(data) {
    this.appliance = data;
  }

  generateApplianceRecipeCard() {
    return `<div class="appliance-item-card">
              <span class="appliance-name-card">${this.appliance}</span>
            </div>`;
  }

  generateApplianceDropdown() {
    return `<div class="appliance-item-dropdown dropdown-option">
              <span class="appliance-name-dropdown">${this.appliance}<i class="fa-solid fa-circle-xmark close-icon" style="display: none;"></i></span>
            </div>`;
  }

  generateAppliancesTags() {
    return `<div class="appliance-item-tag tag custom-tag">
              <span class="appliance-name-tag">${this.appliance}<i class="fa-solid fa-circle-xmark close-icon"></i></span>
            </div>`;
  }
}

export default Appliance;

