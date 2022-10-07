import express, { Router, Request, Response } from 'express'
import InfoController from '../controllers/info.controller'
import AuthService from '../services/auth.service'

const InfoRouter: Router = express.Router()

InfoRouter.get('/info', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await InfoController.getAllInfo(req.query)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

InfoRouter.get('/info/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await InfoController.getOneInfo({ id: parseInt(req.params.id) })
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

InfoRouter.post('/info', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await InfoController.updateInfo(req.body)
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

InfoRouter.delete('/info/:id', async (req: Request, res: Response) => {
    if ('authorization' in req.headers) {
        let authenticate = await AuthService.verify(req.headers.authorization?.split(' ')[1] as string)
        if (authenticate.status == 200) {
            let response = await InfoController.deleteInfo({ id: parseInt(req.params.id) })
            res.status(response.status).send(response)
        } else {
            res.status(authenticate.status).send(authenticate)
        }
    } else {
        res.status(200).send({ message: "Authorization Error" })
    }
})

export default InfoRouter