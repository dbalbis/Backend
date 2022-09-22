import { hashPassword } from '../utils/hashpassword.js';
import usersModel from '../models/index.js';

const postRegister = async (req, res) => {
  const user = req.body;
  user.avatar = `/uploads/${req.file.filename}`;
  user.phone = `+${user.userCountryCode}${user.userphone}`;
  user.password = hashPassword(user.password);
  delete user['userphone'];
  delete user['userCountryCode'];

  const userVal = await usersModel.create(user);
  if (!userVal) {
    return res.status(400).json('Error usuario o email ya registrado!');
  }
  res.redirect('/');
};

export default { postRegister };
