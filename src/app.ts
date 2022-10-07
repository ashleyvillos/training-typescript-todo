import express, { Express, Request, json, Response } from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import config from './config/config'

const app: Express = express();
const env_config: DotenvConfigOutput = dotenv.config();
const port = process.env.PORT || 3002;

// Routes
import UserRouter from './routes/user.route'
import InfoRouter from './routes/info.route'
import TaskRouter from './routes/task.route'

// Middleware
app.use(json());

// Routing
app.use(UserRouter)
app.use(InfoRouter)
app.use(TaskRouter)

let serve = async () => {
    config.authenticate()
    config.sync({ force: false })
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    })
}

serve()