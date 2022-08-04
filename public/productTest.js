const { faker } = require('@faker-js/faker');
faker.locale = 'es';

/* Array vacio */

const testData = [];
/* Funcion Render Products */
async function productsTest() {
  try {
    for (let i = 0; i < 5; i++) {
      testData.push({
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
      });
    }
  } catch (error) {
    console.log('Hubo un error', error);
  }

  console.log('FAKER', testData);
}

module.exports = testData;
