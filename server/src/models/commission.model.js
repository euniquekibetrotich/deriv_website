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
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    currency: {
      type: DataTypes.STRING(8),
      defaultValue: 'USD'
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'paid'),
      defaultValue: 'pending'
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'manual'
    }
  },
  {
    sequelize,
    modelName: 'Commission',
    tableName: 'commissions'
  }
);

