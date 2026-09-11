document.addEventListener('DOMContentLoaded', () => {
  const USERS_KEY = 'poleraExpressUsuarios';
  const SESSION_KEY = 'poleraExpressSesion';

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

  function getUsuarios() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function guardarUsuarios(usuarios) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
  }

  // Iniciar sesión
  const formLogin = document.querySelector('#formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = formLogin.querySelector('#correo');
      const password = formLogin.querySelector('#password');
      let firstError = null;
      let valid = true;

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

      if (!valid) {
        if (firstError) firstError.focus();
        return;
      }

      const usuarios = getUsuarios();
      const usuario = usuarios.find(u => u.correo.toLowerCase() === correo.value.trim().toLowerCase());

      if (!usuario || usuario.password !== password.value) {
        showError(password, 'Correo o contraseña incorrectos.');
        password.focus();
        return;
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify({ nombre: usuario.nombre, correo: usuario.correo }));
      window.location.href = 'index.html';
    });
  }

  // Registrarse
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

      if (!valid) {
        if (firstError) firstError.focus();
        return;
      }

      const usuarios = getUsuarios();
      const yaExiste = usuarios.some(u => u.correo.toLowerCase() === correo.value.trim().toLowerCase());

      if (yaExiste) {
        showError(correo, 'Ya existe una cuenta con este correo.');
        correo.focus();
        return;
      }

      usuarios.push({ nombre: nombre.value.trim(), correo: correo.value.trim(), password: password.value });
      guardarUsuarios(usuarios);

      window.location.href = 'login.html';
    });
  }
});
