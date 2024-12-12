import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

const Signup = sequelize.define(
  "Signup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", // Map to `users` table in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default Signup;
