import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino';
import HabitModel, {IHabit} from './models/Habits';
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
                .findByIdAndUpdate({_id: habit._id}, habit, {new: true})
                .then((data) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.post('/habits', (req, res) => {
            return new HabitModel(req.body)
                .save()
                .then((data: IHabit) => res.send(data))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.listen(port);
    })
    .catch(({message, stack}: Error) => logger.error({stack}, message));
