const productsContainer = document.querySelector('.productsContainer');

const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos/');

    const productsHTML = Object.keys(response.data.data.data)
      .map(function (objectKey, index) {
        var value = response.data.data.data[objectKey];
        return `
      <div class='col-lg-4 col-md-4'>
        <div class='card' style='width: 18rem;'>
          <img
            class='card-img-top cardImg'
            src='${value.photo}'
            alt='Card image cap'
          />
          <div class='card-body'>
            <h5 class='card-title'>${value.title}</h5>
            <p class='card-text'>${value.desc}</p>
            <h6 class='card-subtitle mb-2 text-muted'>$${value.price}</h6>
            <a href='#' class='btn btn-success'>Comprar</a>
          </div>
          </div>
          </div>`;
      })
      .join(' ');
    productsContainer.innerHTML = productsHTML;
  } catch (error) {
    console.log(error);
  }
};

getAllProducts();
