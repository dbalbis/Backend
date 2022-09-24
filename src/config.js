import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 8080,
  URLMONGO: process.env.URLMONGO,
  SECRETMONGO: process.env.SECRET,
  TEST_MAIL: process.env.TEST_MAIL,
  PASS_MAIL: process.env.PASS_MAIL,
  twilioAccountSid: process.env.twilioAccountSid,
  twilioAuthToken: process.env.twilioAuthToken,
  twilioWhatsappFrom: process.env.twilioWhatsappFrom,
  twilioWhatsappTo: process.env.twilioWhatsappTo,
};
