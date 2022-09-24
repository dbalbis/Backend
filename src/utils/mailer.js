import { createTransport } from 'nodemailer';
import config from '../config.js';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.TEST_MAIL,
    pass: config.PASS_MAIL,
  },
}); 

export default transporter;
