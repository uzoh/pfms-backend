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
      fullname: {
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