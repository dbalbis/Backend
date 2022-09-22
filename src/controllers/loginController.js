import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import usersModel from '../models/index.js';
import { isValidPassword } from '../utils/hashpassword.js';
import { fileURLToPath } from 'url';
import path from 'path';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      const user = await usersModel.getUser(username);

      if (!user || !isValidPassword(password, user.password))
        return done(null, false);

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await usersModel.getUser(username);
  done(null, user);
});

const postLogin = (req, res) => {

    res.redirect('/');
  }

export default { postLogin };
