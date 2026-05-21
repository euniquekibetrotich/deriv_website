import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Trade extends Model {}

Trade.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    botId: {
      type: DataTypes.STRING,
      allowNull: true
    },

    contractId: {
      type: DataTypes.STRING,
      allowNull: false
    },

    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },

    stake: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    profit: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },

    status: {
      type: DataTypes.ENUM('won', 'lost', 'open'),
      defaultValue: 'open'
    }
  },
  {
    sequelize,
    modelName: 'Trade',
    tableName: 'trades',
    timestamps: true
  }
);