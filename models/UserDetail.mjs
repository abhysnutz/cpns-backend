import { DataTypes } from "sequelize";
import database from "../config/database.mjs";

const UserDetail = database.define("user_details",{
    birth : {
        type : DataTypes.STRING
    },
    phone : {
        type : DataTypes.STRING
    },
    education : {
        type : DataTypes.STRING
    },
    major : {
        type : DataTypes.STRING
    },
    address : {
        type : DataTypes.STRING
    },
    referrer : {
        type : DataTypes.STRING
    }
})

export default UserDetail;