const { Router } = require('express');
const router = Router();
const { faker } = require('@faker-js/faker');
faker.locale = 'es';

router.get('/api/products-test', (req, res) => {
  const response = [];

  for (let i = 0; i < 5; i++) {
    response.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
    });
  }
  console.log(response);
  res.json(response);
});

module.exports = router;
