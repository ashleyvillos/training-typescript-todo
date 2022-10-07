import Info from "../models/tables/Info"
import User from "../models/tables/User"
import CommonResponse from "../utils/response.utils"
import { GetOneInfoDTO, UpdateInfoDTO, DeleteInfoDTO } from '../models/dto/InfoDTO'
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

class InfoService extends CommonResponse {
    async getAllInfo(offset: number, limit: number, sort: string, order: string = 'ASC') {
        try {
            let info = await Info.findAll({
                offset: offset,
                limit: limit,
                order: [[sort, order]]
            })
            if (info) {
                return this.RESPONSE(OK, info, 0, OK_MESSAGE)
            } else {
                return this.RESPONSE(NOTFOUND, [], 0, NOTFOUND_MESSAGE)
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async getOneInfo(dto: GetOneInfoDTO) {
        try {
            let info = await Info.findOne({ where: { id: dto.id } })
            if (info) {
                return this.RESPONSE(OK, info, 0, OK_MESSAGE)    
            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, NOTFOUND_MESSAGE)    
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    // update user info if existing, create if not
    async updateInfo(dto: UpdateInfoDTO) {
        try {
            let user = await Info.findOne({ where: { user_id: dto.user_id } })
            if (user) {
                let updateData = await Info.update(dto, { where: { user_id: dto.user_id } })
                if (updateData) {
                    return this.RESPONSE(UPDATE, updateData, 0, UPDATE_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            } else {
                let createData = await Info.create({ ...dto })
                if (createData) {
                    return this.RESPONSE(CREATED, createData, 0, CREATED_MESSAGE)
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)
                }
            }
        } catch(err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

    async deleteInfo(dto: DeleteInfoDTO) {
        try {
            let info = await Info.findOne({ where: { id: dto.id } })
            if (info) {
                let removeData = await Info.destroy({ where: { id: dto.id } })
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

export default new InfoService