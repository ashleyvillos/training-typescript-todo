import TaskService from '../services/task.service'
import { GetOneTaskDTO, CreateTaskDTO, UpdateTaskDTO, DeleteTaskDTO } from '../models/dto/TaskDTO'

class InfoController {
    async getAllTask(requestObject: any) {
        let offset = ('offset' in requestObject && requestObject.offset) ? parseInt(requestObject.offset) : 0
        let limit = ('limit' in requestObject && requestObject.limit) ? parseInt(requestObject.limit) : 5
        let sort = ('sort' in requestObject && requestObject.sort) ? requestObject.sort : 'id'
        let order = ('order' in requestObject && requestObject.order) ? requestObject.order : 'ASC'
        let response = await TaskService.getAllTask(offset, limit, sort, order)
        return response
    }

    async getOneTask(dto: GetOneTaskDTO) {
        let response = await TaskService.getOneTask(dto)
        return response
    }

    async createTask(dto: CreateTaskDTO) {
        let response = await TaskService.createTask(dto)
        return response
    }

    async updateTask(dto: UpdateTaskDTO) {
        let response = await TaskService.updateTask(dto)
        return response
    }

    async deleteTask(dto: DeleteTaskDTO) {
        let response = await TaskService.deleteTask(dto)
        return response
    }
}

export default new InfoController

