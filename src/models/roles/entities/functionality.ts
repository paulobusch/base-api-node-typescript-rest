import { Feature } from "./feature";
import { Table, Column, DataType, ForeignKey, BelongsTo, Model } from "sequelize-typescript";

@Table({ timestamps: false })
export class Functionality extends Model<Functionality> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;
    
    @Column({ allowNull: false, unique: true, type: DataType.STRING(150) })
    public name: string;
    
    @ForeignKey(() => Feature)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_feature: string;
    
    @BelongsTo(() => Feature)
    public feature: Feature;
}