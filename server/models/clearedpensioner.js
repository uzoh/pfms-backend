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
  ClearedPensioner.associate = function(models) {
    // associations can be defined here
  };
  return ClearedPensioner;
};
