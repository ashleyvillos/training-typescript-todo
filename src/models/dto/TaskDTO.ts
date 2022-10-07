export class GetOneTaskDTO {
    id: number = 0
}

export class CreateTaskDTO {
    task: string = ''
    schedule_datetime?: Date
}

export class UpdateTaskDTO {
    id: number = 0
    task: string = ''
    schedule_datetime?: Date
}

export class DeleteTaskDTO {
    id: number = 0
}
