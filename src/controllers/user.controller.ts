import UserService from '../services/user.service'
import { GetUserInfoDTO, GetUserTaskDTO, UpdateUserDTO, DeleteUserDTO, SignupDTO, LoginDTO } from '../models/dto/UserDTO'

class UserController {
    async signup(dto: SignupDTO) {
        let response = await UserService.signup(dto)
        return response
    }

    async login(dto: LoginDTO) {
        let response = await UserService.login(dto)
        return response
    }

    // async getAllUsers(requestObject: any) {
    //     let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
    //     let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
    //     let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
    //     let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
    //     let response = await UserService.getAllUsers(offset, limit, sort, order)
    //     return response
    // }

    // async getOneUser(dto: GetOneUserDTO) {
    //     let response = await UserService.getOneUser(dto)
    //     return response
    // }

    async getUserInfo(dto: GetUserInfoDTO) {
        let response = await UserService.getUserInfo(dto)
        return response
    }

    async getUserTasks(dto: GetUserTaskDTO) {
        let response = await UserService.getUserTasks(dto)
        return response
    }

    async updateUser(dto: UpdateUserDTO) {
        let response = await UserService.updateUser(dto)
        return response
    }

    async deleteUser(dto: DeleteUserDTO) {
        let response = await UserService.deleteUser(dto)
        return response
    }
}

export default new UserController
