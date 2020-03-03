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
    // associations can be defined here
  };
  return Clearance;
};
