import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({ timestamps: false })
export class Feature extends Model<Feature> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;
    
    @Column({ unique: true, allowNull: false, type: DataType.STRING(200) })
    public name: string;
}