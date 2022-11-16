import config from '../config.js';
import { hashPassword } from '../utils/hashPassword.js';
import userService from '../services/users.services.js';
import mailer from '../utils/mailer.js';

const postRegister = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      const newUser = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
      };
      if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.phone
      ) {
        res.status(401).json({
          message: `Rellena todos los campos obligatorios! username, email, password, nombre, apellido, telefono`,
        });
      } else {
        if (req.body.password === req.body.password2) {
          newUser.password = hashPassword(req.body.password);
          const data = await userService.add(newUser);
          if (!data) {
            res.status(400).json({ message: 'Usuario o Email ya registado!' });
          } else {
            //Envío de mail al nuevo usuario.
            const mailOptions = {
              from: config.TEST_MAIL,
              to: config.TEST_MAIL,
              subject: 'Nuevo registro | Entrega Final Backend | Diego Balbis',
              html: `<h1 style="color: red;"> ¡SE REGISTRO UN NUEVO USUARIO! </h1>
                     <p>Username: ${newUser.username}</p>
                      <p>Email: ${newUser.email}</p>
                      <p>Name: ${newUser.firstname}</p>
                      <p>Last Name: ${newUser.firstname}</p>   
                      <p>Tel: ${newUser.phone}</p>`,
            };

            try {
              await mailer.sendMail(mailOptions);
            } catch (error) {
              console.log('error con el envio de email', error);
            }
            res
              .status(200)
              .json({ message: 'Usuario registrado con exito!', data });
          }
        } else {
          res.status(401).json({ message: `Las contraseñas no coinciden!` });
        }
      }
    } else {
      res.status(401).json({ message: `Ya estas logeado!` });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  postRegister,
};
