// Fonction pour échapper les caractères HTML
function escapeHTML(str) {
  return str.replace(/[&<>"'\/]/g, function(s) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };
    return entityMap[s];
  });
}

// Fonction pour valider et nettoyer les entrées de texte
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  // Échapper les caractères HTML
  return escapeHTML(input.trim());
}

// Fonction pour valider les entrées de texte et afficher des erreurs
function validateTextInput(inputElement) {
  const value = inputElement.value;
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿâêîôûÂÊÎÔÛ\s-]*$/;


  if (!regex.test(value)) {
    inputElement.classList.add('input-error');
    showErrorMessage(inputElement, 'Lettres et espaces uniquement.');
  } else {
    inputElement.classList.remove('input-error');
    hideErrorMessage(inputElement);
  }
}

// Fonction pour afficher un message d'erreur
function showErrorMessage(inputElement, message) {
  let errorElement = inputElement.previousElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    inputElement.parentNode.insertBefore(errorElement, inputElement);
  }
  errorElement.textContent = message;
}

// Fonction pour masquer le message d'erreur
function hideErrorMessage(inputElement) {
  const errorElement = inputElement.previousElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    inputElement.parentNode.removeChild(errorElement);
  }
}

// Ajouter un écouteur d'événements pour la validation des entrées
function addInputValidation(inputElement) {
  inputElement.addEventListener('input', function(event) {
    validateTextInput(inputElement);
  });

  // Gérer la touche espace explicitement
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
}

export {
  sanitizeInput,
  addInputValidation
};
