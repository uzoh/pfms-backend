"use strict";
module.exports = (sequelize, DataTypes) => {
  const ClearedPensioner = sequelize.define(
    "ClearedPensioner",
    {
      pensionerID: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  ClearedPensioner.associate = (models) => {
    const { Pensioner } = models;
    ClearedPensioner.belongsTo(Pensioner, {
      foreignKey: "pensionerID",
      as: "pensioner"
    });
  };
  return ClearedPensioner;
};
