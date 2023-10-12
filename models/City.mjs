import { DataTypes } from "sequelize";
import database from "../config/database.mjs";

const City = database.define('cities',{
    name : DataTypes.STRING
}, {
    timestamps: false,
})

export default City;