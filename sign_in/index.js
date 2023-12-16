document.addEventListener('DOMContentLoaded', function() {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('passwordInput');

  togglePassword.addEventListener('click', function() {
      if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
          passwordInput.type = 'password';
          togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Clear the username field on page load
  document.getElementById('e-mail').value = '';
});

