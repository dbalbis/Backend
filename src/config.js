import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 8080,
  URLMONGO: process.env.URLMONGO,
  SECRETMONGO: process.env.SECRETMONGO,
  TEST_MAIL: process.env.TEST_MAIL,
  PASS_MAIL: process.env.PASS_MAIL,
};
