import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Bot extends Model {}

Bot.init(
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

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    symbol: {
      type: DataTypes.STRING,
      defaultValue: 'R_75'
    },

    strategy: {
      type: DataTypes.STRING,
      defaultValue: 'basic'
    },

    stake: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },

    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },

    durationUnit: {
      type: DataTypes.STRING,
      defaultValue: 't'
    },

    isRunning: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Bot',
    tableName: 'bots'
  }
);