import cartService from '../services/cart.services.js';
import usersService from '../services/users.services.js';
import productService from '../services/product.services.js';

const createCart = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const id = req.user.id;
      const hasCart = req.user.cart;
      if (hasCart === '') {
        //Creamos un carrito con 0 productos.
        const data = await cartService.createCart({ productos: [] });

        //Editamos el valor currentCart del user que lo creo.
        const assignCart = await usersService.update(id, {
          cart: data._id,
        });

        if (!assignCart || !data) {
          res.status(400).json({ message: 'Error al crear el carrito!' });
        } else {
          res.status(200).json({ message: 'Carrito creado con exito!', data });
        }
      } else {
        res.status(401).json({
          message:
            'El usuario ya tiene un carrito creado, agregale productos! POST /carrito/productos',
        });
      }
    } else {
      res
        .status(401)
        .json({ message: `Para crear un carrito debes estar logeado! POST /login` });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCart = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const cartId = req.user.cart;
      if (cartId === '') {
        res.status(400).json({
          message: 'Para ver tu carrito debes crear uno: POST a /carrito',
        });
      } else {
        const cart = await cartService.findById(cartId);
        if (cart.productos.length === 0) {
          res
            .status(400)
            .json({ message: 'Tu carrito esta vacio! Carga algun producto. POST /carrito/productos' });
        } else {
          if (cart) {
            res.status(200).json({ message: 'Este es tu carrito!.', cart });
          } else {
            res
              .status(400)
              .json({ message: 'Hubo un error cargando tu carrito.' });
          }
        }
      }
    } else {
      res
        .status(401)
        .json({ message: `Para ver tu carrito debes estar logeado! POST /login` });
    }
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const cartId = req.user.cart;
      const idProd = req.body.idProd;
      if (cartId === '') {
        res.status(400).json({
          message:
            'Para agregar un producto primero debes crear un carrito: POST a /carrito',
        });
      } else {
        const productToAdd = await productService.getById(idProd);
        if (!productToAdd) {
          res.status(401).json({
            message: `No existe ningun producto con este id: ${idProd}`,
          });
        } else {
          const currentCart = await cartService.findById(cartId);
          const productos = currentCart?.productos;
          const prodInCart = productos?.find((prod) => prod._id == idProd);
          productos.push(productToAdd);
          if (prodInCart) {
            res.status(200).json({
              message: `Ya existe un producto en el carrito con ese id: ${idProd}`,
            });
          } else {
            productos.map((prod) => {
              if (prod._id == idProd) return prodInCart;
              return prod;
            });
            await cartService.update(cartId, { productos });
            res
              .status(200)
              .json({ message: 'Producto agregado con exito!', productToAdd });
          }
        }
      }
    } else {
      res.status(401).json({
        message: `Para agregar productos a tu carrito debes estar logeado! POST /login`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const removeProduct = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const cartId = req.user.cart;
      const idProd = req.body.idProd;
      const currentCart = await cartService.findById(cartId);
      if (cartId === '') {
        res.status(400).json({
          message:
            'Para eliminar un producto primero debes crear un carrito: POST a /carrito',
        });
      } else {
        const productos = currentCart?.productos;
        const prodInCart = productos?.find((prod) => prod._id == idProd);
        if (prodInCart) {
          const productos = await currentCart.productos.filter(
            (prod) => prod._id != idProd
          );
          const data = await cartService.update(cartId, { productos });
          res.status(200).json({
            message: 'Producto eliminado con exito!',
            prodInCart,
          });
        } else {
          res.status(400).json({
            message: `No existe un producto con ese id: ${idProd}`,
          });
        }
      }
    } else {
      res.status(401).json({
        message: `Para eliminar productos de tu carrito debes estar logeado! POST /login`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default { createCart, getCart, addProduct, removeProduct };
