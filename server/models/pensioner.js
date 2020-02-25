"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pensioner = sequelize.define(
    "Pensioner",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING,
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
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      acctNum: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bank: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nextOfKinName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nextOfKinPhone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Pensioner.associate = function(models) {
    const { PaymentHistory, Pensioner } = models;
    Pensioner.hasMany(PaymentHistory, {
      foreignKey: "pensionerID"
    });
  };
  return Pensioner;
};
