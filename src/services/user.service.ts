import User from "../models/tables/User"
import Info from "../models/tables/Info"
import Task from "../models/tables/Task"
import CommonResponse from "../utils/response.utils"
import { 
    GetUserInfoDTO, 
    GetUserTaskDTO, 
    UpdateUserDTO,
    DeleteUserDTO,
    SignupDTO,
    LoginDTO
} from '../models/dto/UserDTO'
import { OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR } from '../utils/constants.utils'
import { 
    OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE, 
    BADREQUEST_USER_EXIST_MESSAGE 
} from '../utils/message.utils'
import bcrypt from 'bcrypt'
import AuthService from '../services/auth.service'

class UserService extends CommonResponse {
    async login(dto: LoginDTO) {
        try {
            let user = await User.findOne({ where: { username: dto.username } })
            if (user) {
                let passwordConfirm = await bcrypt.compare(dto.password as string, user.getDataValue('password'))
                console.log(passwordConfirm)
                if (passwordConfirm) {
                    let token = await AuthService.auth(user?.get())
                    return this.RESPONSE(OK, token.response, 0, OK_MESSAGE)
                    
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async signup(dto: SignupDTO) {
        try {
            if (dto) {
                let exist = await User.findOne({ where: { username: dto.username } })
                if (exist) {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_USER_EXIST_MESSAGE)
                }

                if (dto.password === dto.confirm_password) {
                    let hashPassword = await bcrypt.hash(dto.password as string, 10)
                    let response = await User.create({
                        username: dto.username,
                        password: hashPassword,
                        is_active: true
                    })
                    if (response) {
                        return this.RESPONSE(OK, response, 0, OK_MESSAGE)
                    } else {
                        return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                    }
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }
            
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getUserTasks(dto: GetUserTaskDTO) {
        try {
            let user = await User.findOne({
                where: { id: dto.id },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'is_active']
                },
                include: {
                    model: Task,
                    as: 'task_items',
                    attributes: ['id', 'task', 'schedule_datetime']
                }
            })
            if (user) {
                return this.RESPONSE(OK, user, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getUserInfo(dto: GetUserInfoDTO) {
        try {
            let user = await User.findOne({
                where: { id: dto.id },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'is_active']
                },
                include: {
                    model: Info,
                    as: 'user_info',
                    attributes: {
                        exclude: ['is_active', 'createdAt', 'updatedAt', 'user_id']
                    }
                }
            })
            if (user) {
                return this.RESPONSE(OK, user, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
  
    async updateUser(dto: UpdateUserDTO) {
        try {
            let user = await User.findOne({ where: { id: dto.id } })
            if (user) {
                if ('password' in dto) {
                    let hashPassword = await bcrypt.hash(dto.password as string, 10)
                    dto.password = hashPassword
                }

                let updateData = await User.update(dto, { where: { id: dto.id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteUser(dto: DeleteUserDTO) {
        try {
            let user = await User.findOne({ where: { id: dto.id } })
            if (user) {
                let updateData = await User.update({ is_active: false }, { where: { id: dto.id } })
                if (updateData) {
                    return this.RESPONSE(OK, updateData, 0, 'Successfully Deleted')
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}   

export default new UserService