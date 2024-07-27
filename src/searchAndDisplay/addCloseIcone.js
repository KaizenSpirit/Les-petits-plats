function addOptionEventListeners(optionElement) {
  optionElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const closeIcon = optionElement.querySelector('.close-icon');
    if (e.target.classList.contains('close-icon')) {
      // Handle removal
      optionElement.classList.remove('selected');
      closeIcon.style.display = 'none';
    } else {
      // Handle selection
      optionElement.classList.add('selected');
      closeIcon.style.display = 'block';
    }
  });
}

export default addOptionEventListeners