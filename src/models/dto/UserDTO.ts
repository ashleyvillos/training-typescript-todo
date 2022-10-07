export class SignupDTO {
    username?: string
    password?: string
    confirm_password?: string
}

export class LoginDTO {
    username?: string
    password?: string
}

export class GetUserInfoDTO {
    id: number = 0
}

export class GetUserTaskDTO {
    id: number = 0
}

export class UpdateUserDTO {
    id: number = 0
    username?:string = ''
    password?:string = ''
}

export class DeleteUserDTO {
    id: number = 0
}