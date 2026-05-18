import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

export class User extends Model {
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.passwordHash);
  }

  toSafeJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      referralCode: this.referralCode,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('affiliate', 'admin'),
      defaultValue: 'affiliate'
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);

User.beforeCreate(async (user) => {
  user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
});

