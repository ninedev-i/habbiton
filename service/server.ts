import express, {Application} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino';
import HabitModel, {IHabit} from './models/Habits';
import ProgressModel, {IProgressData} from './models/Progress';

const logger = pino();

interface IDatabaseConnection {
    port?: number;
    serviceUrl?: string;
}

export class DatabaseConnection {
    app: Application;
    port: number;
    serviceUrl: string;
    isConnected: boolean = false;

    constructor(props?: IDatabaseConnection) {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());

        this.port = props?.port || 3000;
        this.serviceUrl = props?.serviceUrl || 'mongodb://localhost:27017/habits';

        this.app.get('/habits', (req, res) => {
            HabitModel
                .find()
                .then((data: IHabit[]) => res.json(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        this.app.post('/habits/:id', (req, res) => {
            const habit = req.body;
            return HabitModel
                .findOneAndUpdate({_id: habit._id}, habit, {new: true})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        this.app.delete('/habits/:id', (req, res) => {
            return HabitModel
                .deleteOne({_id: req.params.id})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        this.app.post('/habits', (req, res) => {
            return new HabitModel(req.body)
                .save()
                .then((data: IHabit) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        this.app.get('/progress/:date', (req, res) => {
            ProgressModel
                .find({date: req.params.date})
                .then((data: IProgressData[]) => res.json(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        this.app.post('/progress', (req, res) => {
            return new ProgressModel(req.body)
                .save()
                .then((data: IProgressData) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        this.app.post('/progress/:id', (req, res) => {
            const progress = req.body;
            return ProgressModel
                .findOneAndUpdate({_id: req.params.id}, progress, {new: true})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });
    }

    getApp() {
        return this.app;
    }

    connectToDb() {
        const connectionSettings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };

        return mongoose
            .connect(this.serviceUrl, connectionSettings)
            .then(() => {
                this.isConnected = true;
            })
            .catch(({message, stack}: Error) => logger.error({stack}, message));
    }

    checkConnection() {
        return this.isConnected;
    }

    listen() {
        this.app.listen(this.port);
    }

    disconnect() {
        return mongoose
            .disconnect()
            .then(() => {
                this.isConnected = false;
            });
    }
}
