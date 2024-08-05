function escapeHTML(str) {
  return str.replace(/[&<>"\/]/g, function(s) { // Remove apostrophe from the list
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '/': '&#x2F;'
    };
    return entityMap[s];
  });
}

function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  return escapeHTML(input.trim());
}

function validateTextInput(inputElement) {
  const value = inputElement.value; // Do not sanitize here to preserve apostrophes
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿâêîôûÂÊÎÔÛ\s-"'\/]*$/;

  if (!regex.test(value)) {
    inputElement.classList.add('input-error');
    showErrorMessage(inputElement, 'Lettres, espaces, guillemets et barres obliques uniquement');
  } else {
    inputElement.classList.remove('input-error');
    hideErrorMessage(inputElement);
  }
}

function showErrorMessage(inputElement, message) {
  let errorElement = inputElement.previousElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    inputElement.parentNode.insertBefore(errorElement, inputElement);
  }
  errorElement.textContent = sanitizeInput(message); // Sanitize the error message
}

function hideErrorMessage(inputElement) {
  const errorElement = inputElement.previousElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    inputElement.parentNode.removeChild(errorElement);
  }
}

function addInputValidation(inputElement) {
  inputElement.addEventListener('input', function(event) {
    validateTextInput(inputElement);
  });

  inputElement.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      event.preventDefault();
      const start = inputElement.selectionStart;
      const end = inputElement.selectionEnd;
      inputElement.value = inputElement.value.substring(0, start) + ' ' + inputElement.value.substring(end);
      inputElement.setSelectionRange(start + 1, start + 1);
      validateTextInput(inputElement);
    }
  });

  inputElement.addEventListener('keydown', function(event) {
    // Allow backspace and delete keys
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }
  });
}

export {
  sanitizeInput,
  addInputValidation
};
