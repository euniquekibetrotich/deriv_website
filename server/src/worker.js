import { sequelize } from './models/index.js';
import { botLoop } from './services/bot.loop.js';

async function startWorker() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('🟢 Worker starting...');

    await botLoop.start();

  } catch (error) {
    console.error('Worker failed:', error);
    process.exit(1);
  }
}

startWorker();