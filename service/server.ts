import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino';
import HabitModel, {IHabit} from './models/Habits';
import ProgressModel, {IProgressData} from './models/Progress';
import {serviceUrl, connectionSettings} from './mongoSetup';

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const logger = pino();

mongoose
    .connect(serviceUrl, connectionSettings)
    .then(() => {
        app.get('/habits', (req, res) => {
            HabitModel
                .find()
                .then((data: IHabit[]) => res.json(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.post('/habits/:id', (req, res) => {
            const habit = req.body;
            return HabitModel
                .findOneAndUpdate({_id: habit._id}, habit, {new: true})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.delete('/habits/:id', (req, res) => {
            return HabitModel
                .deleteOne({_id: req.params.id})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.post('/habits', (req, res) => {
            return new HabitModel(req.body)
                .save()
                .then((data: IHabit) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.get('/progress/:date', (req, res) => {
            ProgressModel
                .find({date: req.params.date})
                .then((data: IProgressData[]) => res.json(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.post('/progress', (req, res) => {
            return new ProgressModel(req.body)
                .save()
                .then((data: IProgressData) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.post('/progress/:id', (req, res) => {
            const progress = req.body;
            return ProgressModel
                .findOneAndUpdate({_id: req.params.id}, progress, {new: true})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.listen(port);
    })
    .catch(({message, stack}: Error) => logger.error({stack}, message));
