import { DataTypes } from 'sequelize';
import { sequelize } from './../sequelize.js';

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iv: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  },
  {
    timestamps: { createdAt: 'dataCreate', updatedAt: true  }
  }
);
  
export {User };