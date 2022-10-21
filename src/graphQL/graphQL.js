import { buildSchema } from 'graphql';
import productsGraphql from './productsGraphql.js';

const schema = buildSchema(`
  type Product {
    _id: ID!
    title: String!,
    desc: String,
    code: String!,
    photo: String!,
    price: Int!,
    stock: Int!
  }

  input ProductInput {
    title: String,
    desc: String,
    code: String,
    photo: String,
    stock: Int,
    price: Int
  }

  type Query {

    getAll: [Product],
  }

  type Mutation {
    postProduct(datos: ProductInput): Product,
    updateProduct(id: ID!, datos: ProductInput): Product,
    deleteProduct(id: ID!): String,
   
  }

  `);

export default {
  graphqlOptions: {
    schema: schema,
    rootValue: {
      ...productsGraphql,
    },
    graphiql: true,
  },
};
