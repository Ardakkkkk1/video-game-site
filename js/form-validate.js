// Form validation for the feedback/contact form
// - checks required name and email
// - checks email format
// - if password and confirm fields are present, checks length + match

document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form.validate-form');
  if (!forms || forms.length === 0) return;

  function showError(input, message) {
    let el = input.nextElementSibling;
    if (!el || !el.classList.contains('form-error')) {
      el = document.createElement('div');
      el.className = 'form-error text-danger small mt-1';
      input.parentNode.insertBefore(el, input.nextSibling);
    }
    el.textContent = message;
    input.classList.add('is-invalid');
  }

  function clearError(input) {
    const el = input.nextElementSibling;
    if (el && el.classList.contains('form-error')) el.remove();
    input.classList.remove('is-invalid');
  }

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  forms.forEach(function(form){
    form.addEventListener('submit', function (e) {
      let valid = true;
      const name = form.querySelector('input[name="name"], #name');
      const email = form.querySelector('input[type="email"], #email');
      const pwd = form.querySelector('#password');
      const pwdConfirm = form.querySelector('#password-confirm');

      if (name && name.value.trim() === '') {
        showError(name, 'Please enter your name.');
        valid = false;
      } else if (name) clearError(name);

      if (email) {
        if (email.value.trim() === '') {
          showError(email, 'Please enter your email.');
          valid = false;
        } else if (!validateEmail(email.value.trim())) {
          showError(email, 'Please enter a valid email address.');
          valid = false;
        } else {
          clearError(email);
        }
      }

      if (pwd) {
        if (pwd.value.length >= 0 && pwd.value.length < 6) {
          showError(pwd, 'Password must be at least 6 characters.');
          valid = false;
        } else {
          clearError(pwd);
        }
      }

      if (pwd && pwdConfirm) {
        if (pwd.value && pwdConfirm.value && pwd.value !== pwdConfirm.value) {
          showError(pwdConfirm, 'Passwords do not match.');
          valid = false;
        } else if (pwdConfirm) {
          clearError(pwdConfirm);
        }
      }

      if (!valid) e.preventDefault();
    });
  });
});