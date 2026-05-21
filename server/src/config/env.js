import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,

  databaseUrl: process.env.DATABASE_URL,

  jwtSecret: process.env.JWT_SECRET || 'supersecret',

  derivAppId: process.env.DERIV_APP_ID,

  derivApiToken: process.env.DERIV_API_TOKEN,

  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};