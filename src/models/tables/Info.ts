import { 
    Table, 
    Column, 
    AutoIncrement, 
    DataType, 
    Model, 
    CreatedAt, 
    UpdatedAt, 
    PrimaryKey, 
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript'
import User from './User'

@Table({ tableName: 'Info' })
export class Info extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @Column (DataType.STRING) first_name?: string;

    @Column (DataType.STRING) middle_name?: string;

    @Column (DataType.STRING) last_name?: string;

    @Column (DataType.STRING) address?: string;

    @Column (DataType.STRING) hobbies?: string;

    @Column (DataType.DATE) birthdate?: Date;

    @Column (DataType.STRING) birthplace?: string;

    @BelongsTo(() => User)
    user?: User = new User()

    @ForeignKey(() => User)
    @Column (DataType.INTEGER) user_id?: number;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
}

export default Info