import twilio from 'twilio';
import config from '../config.js';

const client = twilio(config.twilioAccountSid, config.twilioAuthToken);

export default client;
