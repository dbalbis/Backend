/* LOGIN */
const loginForm = document.querySelector('#loginForm');
const usernameInput = document.querySelector('#username');

async function submitHandler(e) {
  console.log('El evento');
  e.preventDefault();
  try {
    await fetch(`/api/login?username=${usernameInput.value}`);
    window.location.href = '/';
  } catch (err) {
    console.log('Hubo un error', err);
  }
}

loginForm.addEventListener('submit', submitHandler);
