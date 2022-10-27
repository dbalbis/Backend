/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'productsSails',
  attributes: {
    timestamp: { type: 'Number', defaultsTo: Date.now() },
    title: { type: 'String', required: true },
    desc: 'String',
    code: 'String',
    photo: 'String',
    price: { type: 'Number', required: true },
    stock: { type: 'Number', required: true },
  },
};
