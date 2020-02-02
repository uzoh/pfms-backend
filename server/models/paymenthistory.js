'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentHistory = sequelize.define('PaymentHistory', {
    pensionerID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {});
  PaymentHistory.associate = function (models) {
    // associations can be defined here
  };
  return PaymentHistory;
};