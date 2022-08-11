const socket = io();

const formProductos = document.querySelector('.productosForm');
const formTitle = document.querySelector('#prodTitle');
const formPrice = document.querySelector('#prodPrice');
const formThumbnail = document.querySelector('#prodThumbnail');
const productsPool = document.querySelector('.productsPool');
const noProducts = document.querySelector('.noProducts');
const yesProducts = document.querySelector('.yesProducts');

/* Funcion agregar Product */
function postProduct() {
  try {
    const title = formTitle.value;
    const price = formPrice.value;
    const thumbnail = formThumbnail.value;

    const productObject = { title, price, thumbnail };

    socket.emit('client:envioproduct', productObject);
  } catch (error) {
    console.log('Hubo un error', error);
  }
}
/* Funcion Render Products */
async function renderProduct(data) {
  try {
    const response = await fetch('/template.hbs');
    const templateHbs = await response.text();

    productsPool.innerHTML = '';
    if (data.length > 0) {
      yesProducts.style.display = '';
      noProducts.style.display = 'none';
      data.forEach((product) => {
        const template = Handlebars.compile(templateHbs);

        const html = template(product);

        productsPool.innerHTML += html;
      });
    } else {
      yesProducts.style.display = 'none';
      noProducts.style.display = '';
    }
  } catch (error) {
    console.log('Hubo un error', error);
  }
}
/* Evento */
formProductos.addEventListener('submit', (event) => {
  event.preventDefault();
  postProduct();
  formProductos.reset();
});

socket.on('server:envioproductos', (data) => {
  renderProduct(data);
});

/* CHAT */
const formMessages = document.querySelector('.messagesForm');
const chatUserEmail = document.querySelector('#userEmail');
const chatUserMessage = document.querySelector('#userMessage');
const messagesPool = document.querySelector('.messagesPool');
//Fecha

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
const fecha = hoy.toLocaleDateString();
const tiempo = new Date();
const argHora = tiempo.toLocaleTimeString('it-IT');

/* Funcion agregar Mensaje */
function postMessage2() {
  try {
    const email = chatUserEmail.value;
    const message = chatUserMessage.value;

    const messageObject = { email, message };

    socket.emit('client:enviomessage', messageObject);
  } catch (error) {
    console.log('Hubo un error', error);
  }
}

/* Evento Mensajes */
formMessages.addEventListener('submit', (event) => {
  event.preventDefault();
  postMessage2();
  formMessages.reset();
});

socket.on('server:enviomessages', (messages) => {
  renderMessages(messages);
});

/* Function render Messages */

async function renderMessages(messages) {
  try {
    const html = messages
      .map((messageInfo) => {
        return `<div>
          <strong style="color: blue;" >${messageInfo.email}</strong>[
          <span style="color: brown;">${messageInfo.date}</span>]:
          <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`;
      })
      .join(' ');

    messagesPool.innerHTML = html;
  } catch (error) {
    console.log('Hubo un error', error);
  }
}
