import { sequelize } from '../models/index.js';

try {
  await sequelize.sync({ alter: true });
  console.log('Database synced');
  await sequelize.close();
} catch (error) {
  console.error('Database sync failed:', error);
  process.exit(1);
}

