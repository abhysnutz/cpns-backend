import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const DB_CONNECTION = process.env.NODE_ENV === 'production' ? process.env.DB_CONNECTION : 'mysql';
const DB_HOST       = process.env.NODE_ENV === 'production' ? process.env.DB_HOST       : '127.0.0.1';
const DB_USERNAME   = process.env.NODE_ENV === 'production' ? process.env.DB_USERNAME   : 'root';
const DB_PASSWORD   = process.env.NODE_ENV === 'production' ? process.env.DB_PASSWORD   : 'M2APS2Ldoank';
const DB_DATABASE   = process.env.NODE_ENV === 'production' ? process.env.DB_DATABASE   : 'belajar_node';

const database = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD, {
    host    : DB_HOST,
    dialect : DB_CONNECTION
})

export default database;