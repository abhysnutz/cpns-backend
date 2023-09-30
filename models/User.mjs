import { DataTypes } from "sequelize";
import database from "../config/database.mjs";

const User = database.define("users",{
    name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    verify : {
        type :DataTypes.BOOLEAN,
        defaultValue : false
    },
    referrer : {
        type : DataTypes.STRING
    },
})

export default User;