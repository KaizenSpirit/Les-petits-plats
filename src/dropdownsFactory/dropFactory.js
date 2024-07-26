import Ingredient from "../models/ingredient.model.js";
import Appliance from "../models/appliance.model.js";
import Ustensile from "../models/ustensile.model.js";


class CookFactory {  
  constructor(data) {
    if (data.ingredient) {
      return new Ingredient(data);
    } else if (data.appliance) {
      return new Appliance(data.appliance);
    } else if (Array.isArray(data.ustensils)) {
      return data.ustensils.map(ust => new Ustensile(ust));
    }
  }
}

export default CookFactory;
