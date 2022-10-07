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
    HasOne,
    HasMany
} from 'sequelize-typescript'
import Info from './Info'
import Task from './Task'

@Table({ tableName: 'User' })
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @Column (DataType.STRING) username?: string;

    @Column (DataType.STRING) password?: string;

    @Default(true)
    @Column (DataType.BOOLEAN) is_active?: boolean;

    @HasOne(() => Info)
    user_info: Info[] = []

    @HasMany(() => Task)
    task_items: Task[] = []

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default User