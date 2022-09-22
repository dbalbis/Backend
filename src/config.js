import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 8080,
  URLMONGO: process.env.URLMONGO,
  SECRETMONGO: process.env.SECRET,
};
