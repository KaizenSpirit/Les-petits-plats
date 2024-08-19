document.querySelectorAll('.search-bar input, .search-container input').forEach((input, index) => {
    const closeIcon = document.querySelectorAll('.search-bar #search-close, .search-container .search-close-dropdown')[index];

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
