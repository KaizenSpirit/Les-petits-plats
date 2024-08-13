export function getMainSearchValue() {
  const searchInput = document.getElementById('searchInput');
  return searchInput ? searchInput.value.toLowerCase() : '';
}

export function displayNoRecipesMessage(searchValue, selectedTags) {
  const messageContainer = document.querySelector('.message-zero-recipes');
  if (selectedTags.length > 0) {
    let tagsMessage = `<span class="random-message">"${selectedTags.join('", "')}, <span class="random-message-search-value">"${searchValue}" </span>. </span> Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    messageContainer.innerHTML = `
      <h4> Aucune recette ne contient ${tagsMessage}. </h4>
    `;
  } else {
    messageContainer.innerHTML = `
      <h4>Aucune recette ne contient <span class="random-message-search-value"> '${searchValue}' </span>. Vous pouvez chercher «
tarte aux pommes », « poisson », etc.</span></h4>
    `;
  }
}