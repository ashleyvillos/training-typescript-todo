import express, { Router, Request, Response } from 'express'
import TaskController from '../controllers/task.controller'
import AuthService from '../services/auth.service'

const TaskRouter: Router = express.Router()

TaskRouter.get('/task', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TaskController.getAllTask(req.query)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

TaskRouter.get('/task/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TaskController.getOneTask({ id: parseInt(req.params.id) })
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

TaskRouter.post('/task', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TaskController.createTask(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

TaskRouter.put('/task', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TaskController.updateTask(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

TaskRouter.delete('/task/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await TaskController.deleteTask({ id: parseInt(req.params.id) })
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

export default TaskRouter