import { User } from './user.model.js';
import { Referral } from './referral.model.js';
import { Commission } from './commission.model.js';
import { sequelize } from '../config/database.js';

User.hasMany(Referral, { foreignKey: 'userId', as: 'referrals' });
Referral.belongsTo(User, { foreignKey: 'userId', as: 'affiliate' });

User.hasMany(Commission, { foreignKey: 'userId', as: 'commissions' });
Commission.belongsTo(User, { foreignKey: 'userId', as: 'affiliate' });

Referral.hasMany(Commission, { foreignKey: 'referralId', as: 'commissions' });
Commission.belongsTo(Referral, { foreignKey: 'referralId', as: 'referral' });

export { sequelize, User, Referral, Commission };
export { Bot } from './bot.model.js';
