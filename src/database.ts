import {Sequelize} from 'sequelize-typescript';
import { User } from '@models/users/entities/user';
import { RoleFunctionality } from '@models/roles/entities/role-functionality';
import { Functionality } from '@models/roles/entities/functionality';
import { Feature } from '@models/roles/entities/feature';
import { Role } from '@models/roles/entities/role';
 
const Db =  new Sequelize({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        models: [User, Role, RoleFunctionality, Functionality, Feature]
});

export { Db };