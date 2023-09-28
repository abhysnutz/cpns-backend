import { Sequelize } from "sequelize";

const database = new Sequelize('belajar_node','root','M2APS2Ldoank', {
    host : '127.0.0.1',
    dialect : 'mysql'
})

export default database;