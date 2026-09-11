document.addEventListener('DOMContentLoaded', () => {
  const DEBUG = true; // Set to false to allow real submits
  console.log('main.js cargado — DEBUG=', DEBUG);

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
    console.warn('Validation error on', input.id || input.name, message);
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

      console.log('Intento de submit (login)', { correo: correo.value.trim(), passwordLength: password.value.length });

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
        const payload = { correo: correo.value.trim(), passwordLength: password.value.length };
        if (DEBUG) {
          console.log('Login válido — DEBUG previene envío. Datos:', payload);
        } else {
          console.log('Login válido — enviando', payload);
          formLogin.submit();
        }
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

      console.log('Intento de submit (registro)', { nombre: nombre.value.trim(), correo: correo.value.trim(), passwordLength: password.value.length });

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
        const payload = { nombre: nombre.value.trim(), correo: correo.value.trim(), passwordLength: password.value.length };
        if (DEBUG) {
          console.log('Registro válido — DEBUG previene envío. Datos:', payload);
        } else {
          console.log('Registro válido — enviando', payload);
          formRegister.submit();
        }
      } else if (firstError) {
        firstError.focus();
      }
    });
  }
});
