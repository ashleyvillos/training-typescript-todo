import Task from "../models/tables/Task"
import CommonResponse from "../utils/response.utils"
import { GetOneTaskDTO, CreateTaskDTO, UpdateTaskDTO, DeleteTaskDTO } from '../models/dto/TaskDTO'
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

class TaskService extends CommonResponse {
    async getAllTask(offset: number, limit: number, sort: string, order: string) {
        try {
            let task = await Task.findAll({
                offset: offset,
                limit: limit,
                order: [[sort, order]]
            })
            if (task) {
                return this.RESPONSE(OK, task, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getOneTask(dto: GetOneTaskDTO) {
        try {
            let task = await Task.findOne({ where: { id: dto.id } })
            if (task) {
                return this.RESPONSE(OK, task, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)    
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    // No duplicate validations included
    // This function allows multiple tasks with the same task name --> No Restrictions
    async createTask(dto: CreateTaskDTO) {
        try {
            let createData = await Task.create({ ...dto })
            if (createData) {
                return this.RESPONSE(CREATED, createData, 0, CREATED_MESSAGE)
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async updateTask(dto: UpdateTaskDTO) {
        try {
            let task = await Task.findOne({ where: { id: dto.id } })
            if (task) {
                let updateData = await Task.update(dto, { where: { id: dto.id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, [], 0, UPDATE_MESSAGE)    
                } else {
                    return this.RESPONSE(BADREQUEST, [], 0, BADREQUEST_MESSAGE)    
                }
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteTask(dto: DeleteTaskDTO) {
        try {
            let task = await Task.findOne({ where: { id: dto.id } })
            if (task) {
                let removeData = await Task.destroy({ where: { id: dto.id } })
                if (removeData) {
                    return this.RESPONSE(OK, {}, 0, "Successfully Deleted")
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }
}

export default new TaskService