import { app } from './app.js';
import { env } from './config/env.js';
import { sequelize } from './models/index.js';

async function start() {
  try {

    console.log('🚀 Starting server...');

    // database
    await sequelize.authenticate();
    console.log('✅ DB connected');

    // sync tables
    await sequelize.sync();
    console.log('✅ DB synced');

    // start api
    app.listen(env.port, () => {
      console.log(`✅ API running on port ${env.port}`);
    });

  } catch (error) {
    console.error('❌ Failed to start API:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('🛑 Shutting down...');
  process.exit(0);
});

start();