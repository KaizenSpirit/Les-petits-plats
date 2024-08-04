function showRecipeText(){
  const descriptions = document.querySelectorAll('.recipe-card .section-title-recette p');
  descriptions.forEach(description => {
    description.addEventListener('click', () => {
      description.classList.toggle('expanded');
    });
  });
}


export default showRecipeText