  const searchInputs = document.querySelectorAll('.search-bar input, .search-container input');
  const searchCloses = document.querySelectorAll('.search-bar #search-close, .search-container .search-close-dropdown');

  searchInputs.forEach((input, index) => {
      const closeIcon = searchCloses[index];

      input.addEventListener('input', () => {
          if (input.value.length > 0) {
              closeIcon.style.display = 'block';
          } else {
              closeIcon.style.display = 'none';
          }
      });

      closeIcon.addEventListener('click', (e) => {
          e.stopPropagation();
          input.value = '';
          input.dispatchEvent(new Event('input'));
      });
  });
