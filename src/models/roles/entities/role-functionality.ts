import { Table, Column, ForeignKey, DataType, Unique, Model, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import { Role } from "./role";
import { Functionality } from "./functionality";

@Table({ tableName: 'role_functionalities', timestamps: false })
export class RoleFunctionality extends Model<RoleFunctionality> {
    @ForeignKey(() => Role)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_role: string;
    
    @ForeignKey(() => Functionality)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_functionality: string;
}