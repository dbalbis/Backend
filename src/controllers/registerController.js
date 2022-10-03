import { hashPassword } from '../utils/hashpassword.js';
import usersService from '../services/users.services.js';
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import mailer from '../utils/mailer.js';
import logger from '../utils/logger.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const postRegister = async (req, res) => {
  try {
    const user = req.body;
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    user.phone = `+${user.userCountryCode}${user.userphone}`;
    user.password = hashPassword(user.password);
    delete user['userphone'];
    delete user['userCountryCode'];

    const userVal = await usersService.postRegister(user);
    if (!userVal) {
      return res.status(400).json('Error usuario o email ya registrado!');
    }
    //Envío de mail al nuevo usuario.
    const mailOptions = {
      from: 'Tercera entrega | Diego Balbis',
      to: config.TEST_MAIL,
      subject: 'Nuevo registro',
      html: `<h1 style="color: red;"> ¡SE REGISTRO UN NUEVO USUARIO! </h1>
    <p>Email: ${userVal.email}</p>
    <p>Name: ${userVal.name}</p>
    <p>Address: ${userVal.address}</p>
    <p>Age: ${userVal.age}</p>
    <p>Tel: ${userVal.phone}</p>
    <p>Avatar adjunto</p>
    `,
      attachments: [{ path: __dirname + '/../public' + userVal.avatar }],
    };

    try {
      await mailer.sendMail(mailOptions);
    } catch (error) {
      logger.error(error);
    }

    res.send(
      `<script type="text/javascript"> alert("Registro exitoso! Ahora ingresa con tu usuario."); window.location.href = "/login"; </script>`
    );
  } catch (error) {
    logger.error(`Se produjo un error al registrar el usuario ${error}`);
  }
};

export default { postRegister };
