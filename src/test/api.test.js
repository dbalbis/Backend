import supertest from 'supertest';
import { expect } from 'chai';
import productGenerator from './productGeneratorFaker.js';

let request;

describe('test sobre API RESTFUL', () => {
  before(() => {
    request = supertest('http://localhost:3000');
  });
  describe('metodos GET /api/productos', () => {
    it('debería traer un objeto con los productos en la BD y status 200', async () => {
      const res = await request.get('/api/productos');

      expect(res.status).to.eql(200);
      expect(res.body.data).to.be.an('object');
    });
  });

  describe('metodos GET unknown', () => {
    it('debería devolver un error 404 not found', async () => {
      const res = await request.get('/paginaquenoexiste');

      expect(res.status).to.eql(404);
    });
  });

  describe('metodo POST para agregar producto', () => {
    const productoRandom = productGenerator.get();
    it('debería devolver un objeto con el producto creado y un status 200', async () => {
      const res = await request.get('/api/productos').send(productoRandom);

      expect(res.status).to.eql(200);
      expect(res.body.data).to.be.an('object');
    });
  });
  /* PONER EL ID A MANO */
  describe('metodo DELETE para eliminar producto', () => {
    it('debería devolver un id con el producto eliminado y un status 200', async () => {
      const res = await request.delete(
        '/api/productos/634e3dac4307dbdfed0ca0ba'
      );

      expect(res.status).to.eql(200);
    });
  });
  /* PONER EL ID A MANO */
  describe('metodo PUT para actualizar un producto', () => {
    const productoRandom = productGenerator.get();
    it('debería devolver un status 200', async () => {
      const res = await request
        .put('/api/productos/634e3e77b89b34763c2f946e')
        .send(productoRandom);

      expect(res.status).to.eql(200);
    });
  });
});
