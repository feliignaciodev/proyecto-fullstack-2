document.addEventListener('DOMContentLoaded', () => {
  // main.js cargado

  // Helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    clearError(input);
    const el = document.createElement('div');
    el.className = 'error-message';
    el.textContent = message;
    input.insertAdjacentElement('afterend', el);
  }

  function clearError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList && next.classList.contains('error-message')) {
      next.remove();
    }
  }

  // Login validation
  const formLogin = document.querySelector('#formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = formLogin.querySelector('#correo');
      const password = formLogin.querySelector('#password');
      let firstError = null;
      let valid = true;

      // intento de submit (login)

      clearError(correo);
      clearError(password);

      if (!correo.value.trim() || !validateEmail(correo.value.trim())) {
        showError(correo, 'Introduce un correo válido.');
        valid = false;
        firstError = firstError || correo;
      }

      if (!password.value || password.value.length < 8) {
        showError(password, 'La contraseña debe tener al menos 8 caracteres.');
        valid = false;
        firstError = firstError || password;
      }

      if (valid) {
        formLogin.submit();
      } else if (firstError) {
        firstError.focus();
      }
    });
  }

  // Register validation
  const formRegister = document.querySelector('#formRegister');
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = formRegister.querySelector('#nombre');
      const correo = formRegister.querySelector('#correo');
      const password = formRegister.querySelector('#password');
      const confirmar = formRegister.querySelector('#confirmar');
      let firstError = null;
      let valid = true;

      // intento de submit (registro)

      [nombre, correo, password, confirmar].forEach(clearError);

      if (!nombre.value.trim()) {
        showError(nombre, 'Ingresa tu nombre completo.');
        valid = false;
        firstError = firstError || nombre;
      }

      if (!correo.value.trim() || !validateEmail(correo.value.trim())) {
        showError(correo, 'Introduce un correo válido.');
        valid = false;
        firstError = firstError || correo;
      }

      if (!password.value || password.value.length < 8) {
        showError(password, 'La contraseña debe tener al menos 8 caracteres.');
        valid = false;
        firstError = firstError || password;
      }

      if (confirmar.value !== password.value) {
        showError(confirmar, 'Las contraseñas no coinciden.');
        valid = false;
        firstError = firstError || confirmar;
      }

      if (valid) {
        formRegister.submit();
      } else if (firstError) {
        firstError.focus();
      }
    });
  }
});
