"use strict";
module.exports = (sequelize, DataTypes) => {
  const Clearance = sequelize.define(
    "Clearance",
    {
      pensionerID: {
        type: DataTypes.UUID,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Clearance.associate = function(models) {
    const { Clearance, Pensioner } = models;

    Clearance.belongsTo(Pensioner, {
      foreignKey: "pensionerID"
    });
  };
  return Clearance;
};
