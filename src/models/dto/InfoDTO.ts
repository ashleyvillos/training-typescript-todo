export class GetOneInfoDTO {
    id: number = 0
}

export class UpdateInfoDTO {
    user_id: number = 0
    first_name?:string = ''
    middle_name?:string = ''
    last_name?:string = ''
    address?:string = ''
    hobbies?:string = ''
    birthdate?:Date
    birthplace?:string = ''
}

export class DeleteInfoDTO {
    id: number = 0
}
