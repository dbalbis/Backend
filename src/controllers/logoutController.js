import logger from '../utils/logger.js';

const postLogout = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const username = req.user.username;

      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res
          .status(200)
          .json({ mesage: `Logout exitoso, hasta luego ${username}!` });
      });
    } else {
      res.status(401).json({ message: `No estas logeado! POST /login` });
    }
  } catch (error) {
    logger.error(error);
  }
};

export default { postLogout };
