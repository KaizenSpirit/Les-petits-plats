export function getMainSearchValue() {
  const searchInput = document.getElementById('searchInput');
  return searchInput ? searchInput.value.toLowerCase() : '';
}

export function getRandomSuggestions(recipes, count = 2) {
  const allSuggestions = [];

  recipes.forEach(recipe => {
    allSuggestions.push(...recipe.ingredients.map(ing => ing.ingredient));
    allSuggestions.push(recipe.appliance.appliance);
    allSuggestions.push(...recipe.ustensils.map(ust => ust.ustensile));
  });

  const uniqueSuggestions = Array.from(new Set(allSuggestions));
  const randomSuggestions = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueSuggestions.length);
    randomSuggestions.push(uniqueSuggestions[randomIndex]);
    uniqueSuggestions.splice(randomIndex, 1);
  }

  return randomSuggestions;
}

export function displayNoRecipesMessage(searchValue, suggestions, selectedTags) {
  const messageContainer = document.querySelector('.message-zero-recipes');
  if (selectedTags.length > 0) {
    let tagsMessage = ` à la fois "<span class="random-message">${selectedTags.join('", "')} </span>" et `;
    messageContainer.innerHTML = `
      <h4> Aucune recette ne contient ${tagsMessage} '<span class="random-message">${searchValue}</span>' </h4>
    `;
  } else {
    messageContainer.innerHTML = `
      <h4 class="random-message-title">Aucune recette ne contient <span class="random-message"> '${searchValue}' </span>, vous pouvez chercher «
tarte aux pommes », « poisson », etc.</span></h4>
    `;
  }
}