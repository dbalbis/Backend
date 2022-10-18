import { faker } from '@faker-js/faker';
faker.locale = 'es';

const get = () => ({
  title: faker.commerce.productName(),
  desc: 'test usando faker',
  code: `xxx${faker.random.numeric(3)}`,
  price: faker.commerce.price(1000),
  stock: faker.random.numeric(2),
  photo: faker.image.food(400, 400, true),
});

export default { get };
