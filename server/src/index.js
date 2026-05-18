import { app } from './app.js';
import { env } from './config/env.js';
import { sequelize } from './models/index.js';

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start API:', error);
    process.exit(1);
  }
}

start();

