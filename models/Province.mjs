import { DataTypes } from "sequelize";
import database from "../config/database.mjs";

const Province = database.define('provinces', {
    name : DataTypes.STRING,
    old : DataTypes.STRING,
},{
    timestamps: false
});

export default Province;