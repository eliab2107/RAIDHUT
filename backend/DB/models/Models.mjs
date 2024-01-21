import { DataTypes } from 'sequelize';
import { sequelize, Sequelize } from '../sequelize.js';

const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    nick: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allownull: false
    },
   
  },
  {
    timestamps: { createdAt: 'dataCreate', updatedAt: true  }
  }
);

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
User.hasMany(Post, { as: 'postagens' });
Post.belongsTo(User);
export {User, Post };