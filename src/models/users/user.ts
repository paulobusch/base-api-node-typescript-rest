import {Table, Column, Model, HasMany, DataType, Index, DeletedAt, UpdatedAt, CreatedAt} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;
    
    @Column({ allowNull: false, type: DataType.STRING(11) })
    public cpf: string;

    @Index('idx_users_name')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(200) })
    public name: string;
    
    @Index('idx_users_email')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(200) })
    public email: string;

    @Index('idx_users_login')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(50) })
    public login: string;

    @Column({ allowNull: false, type: DataType.STRING(50) })
    public password: string;

    @Column({ allowNull: false })
    public birth: Date;

    @CreatedAt public created?: Date;
    @UpdatedAt public updated?: Date;
    @DeletedAt public deleted?: Date;
}