import {Table, Column, Model, HasMany, DataType, Index, DeletedAt, UpdatedAt, CreatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Role } from '@models/roles/entities/role';

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

    @Column({ allowNull: false, type: DataType.STRING(80) })
    public password: string;

    @Column({ allowNull: false })
    public birth: Date;

    @ForeignKey(() => Role)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_role: string;

    @BelongsTo(() => Role)
    public role: Role;

    @CreatedAt public created?: Date;
    @UpdatedAt public updated?: Date;
    @DeletedAt public deleted?: Date;
}