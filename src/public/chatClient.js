const socket = io();
const form = document.getElementById('form');
const email = document.getElementById('email');
const input = document.getElementById('input');


form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', email.value, input.value);
    input.value = '';
    email.value = '';
  }
});
socket.on('server:message', (messages) => {
  renderMessages(messages);
});

/* Function render Messages */

const messagesPool = document.getElementById('messages');

async function renderMessages(messages) {
  try {
    const html = messages
      .map((messageInfo) => {
        return `<div>
          <strong style="color: blue;" >${messageInfo.email}</strong>[
          <span style="color: brown;">${messageInfo.timestamp}</span>]:
          <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`;
      })
      .join(' ');

    messagesPool.innerHTML = html;
  } catch (error) {
    console.log('Hubo un error', error);
  }
}
