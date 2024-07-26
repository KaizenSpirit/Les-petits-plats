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
    return `<div class="appliance-item-dropdown">
              <span class="appliance-name-dropdown">${this.appliance}</span>
            </div>`;
  }
}

export default Appliance;
