import Ingredient from "../models/ingredient.model.js";
import Appliance from "../models/appliance.model.js";
import Ustensile from "../models/ustensile.model.js";

class CookFactory {  
  constructor(option, type) {
    if (type === "ingredient") {
      return new Ingredient(option);
    } else if (type === "appliance") {
      return new Appliance(option);
    } else if (type === "ustensile") {
      return [option].map(ust => new Ustensile(ust));
    }
  }
}

export default CookFactory;

