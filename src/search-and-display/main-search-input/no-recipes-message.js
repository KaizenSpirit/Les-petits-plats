export function getMainSearchValue() {
  const searchInput = document.getElementById('searchInput');
  return searchInput ? searchInput.value.toLowerCase() : '';
}

export function displayNoRecipesMessage(searchValue, selectedTags) {
  const messageContainer = document.querySelector('.message-zero-recipes');
  if (selectedTags.length > 0) {
    let tagsMessage = ` à la fois "<span class="random-message">${selectedTags.join('", "')} </span>" et votre dernière recherche :`;
    messageContainer.innerHTML = `
      <h4> Aucune recette ne contient ${tagsMessage} '<span class="random-message-search-value">${searchValue} .</span>' </h4>
    `;
  } else {
    messageContainer.innerHTML = `
      <h4 class="random-message-title">Aucune recette ne contient <span class="random-message-search-value"> '${searchValue}' </span>, vous pouvez chercher «
tarte aux pommes », « poisson », etc.</span></h4>
    `;
  }
}