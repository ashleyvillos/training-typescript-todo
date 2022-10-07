import { 
    Table, 
    Column, 
    AutoIncrement, 
    Default, 
    DataType, 
    Model, 
    CreatedAt, 
    UpdatedAt, 
    PrimaryKey,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript'
import User from './User'

@Table({ tableName: 'Task' })
export class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @Column (DataType.STRING) task?: string;

    @Column (DataType.DATE) schedule_datetime?: Date;

    @BelongsTo(() => User)
    user?: User = new User()

    @ForeignKey(() => User)
    @Column (DataType.INTEGER) user_id?: number;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default Task