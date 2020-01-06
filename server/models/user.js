import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

const salt = process.env.SALT || 5;

const SALT_ROUNDS = parseInt(salt, 10);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.CITEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: (user) => User.hashPassword(user),
        beforeUpdate: (user) => User.hashPassword(user)
      }
    }
  );
  User.associate = (models) => {
    const {
      Address, Promotion, Rating, Order, Product
    } = models;

    User.hasMany(Address, {
      foreignKey: "userId",
      as: "address"
    });

    User.hasMany(Promotion, {
      foreignKey: "userId",
      as: "promotion"
    });

    User.hasMany(Rating, {
      foreignKey: "userId",
      as: "rating"
    });

    User.hasMany(Order, {
      foreignKey: "userId",
      as: "order"
    });

    User.belongsToMany(Promotion, {
      foreignKey: "userId",
      otherKey: "promotionId",
      through: "UserPromotion",
      as: "promotion"
    });

    User.belongsToMany(Product, {
      foreignKey: "userId",
      otherKey: "productId",
      through: "Rating",
      as: "rating"
    });
  };
  User.hashPassword = async (user) => {
    const changedDbValue = await user.changed(
      "password",
      user.dataValues.password
    );
    if (
      changedDbValue._previousDataValues.password
      !== changedDbValue.dataValues.password
    ) {
      const hash = await bcrypt.hash(user.dataValues.password, SALT_ROUNDS);
      await user.setDataValue("password", hash);
    }
  };
  return User;
};