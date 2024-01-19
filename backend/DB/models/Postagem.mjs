import { DataTypes } from 'sequelize';
import { sequelize, Sequelize } from './../sequelize.js';
import { User } from './Usuario.mjs';

const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
        allownull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allownull: false
    },
    horarioPubli: {
        type: DataTypes.DATE,
        default: Date.now(),
    },
    
});
export {Post };