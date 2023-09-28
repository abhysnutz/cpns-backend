import { DataTypes } from "sequelize";
import database from "../config/database.mjs";

const User = database.define("users",{
    username : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    }
})

export default User;