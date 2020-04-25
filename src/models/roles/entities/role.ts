import { Functionality } from "./functionality";
import { Table, Column, DataType, Index, BelongsTo, BelongsToMany, Model, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import { RoleFunctionality } from "./role-functionality";
import { User } from "@models/users/entities/user";

@Table
export class Role extends Model<Role> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;

    @Index('idx_role_name')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(150) })
    public name: string;

    @BelongsToMany(() => Functionality, () => RoleFunctionality)
    public functionalities: Functionality[];

    @HasMany(() => User)
    public users: User[];

    @CreatedAt public created?: Date;
    @UpdatedAt public updated?: Date;
    @DeletedAt public deleted?: Date;
}