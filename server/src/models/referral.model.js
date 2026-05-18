import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Referral extends Model {}

Referral.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visitorId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    referredEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true }
    },
    status: {
      type: DataTypes.ENUM('clicked', 'registered', 'funded'),
      defaultValue: 'clicked'
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Referral',
    tableName: 'referrals'
  }
);

