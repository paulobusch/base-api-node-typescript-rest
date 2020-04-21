import {Sequelize} from 'sequelize-typescript';
import { User } from '@models/users/user';
 
const Db =  new Sequelize({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        models: [User]
});

export { Db };