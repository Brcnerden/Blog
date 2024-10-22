const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik olsun
    createdAt: "created_at", // Veritabanında snake_case kullanıldığı için belirtiyoruz
    updatedAt: "updated_at", // Aynı şekilde updatedAt için de
  }
);

module.exports = User;
