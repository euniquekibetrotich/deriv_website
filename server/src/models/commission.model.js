import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Commission extends Model {}

Commission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    // affiliate who earns
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    // user who triggered commission
    referredUserId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },

    currency: {
      type: DataTypes.STRING(8),
      defaultValue: 'USD'
    },

    type: {
      type: DataTypes.ENUM('SIGNUP', 'TRADE', 'DEPOSIT'),
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('pending', 'approved', 'paid'),
      defaultValue: 'pending'
    },

    source: {
      type: DataTypes.ENUM('deriv', 'manual', 'campaign', 'bot_marketplace'),
      defaultValue: 'deriv'
    }
  },
  {
    sequelize,
    modelName: 'Commission',
    tableName: 'commissions',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['referredUserId'] },
      { fields: ['status'] },
      { fields: ['type'] }
    ]
  }
);