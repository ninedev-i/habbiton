import express from 'express';
import mongoose from 'mongoose';
import pino from 'pino';
import HabitModel, {IHabit} from './models/Habits';
import {serviceUrl, connectionSettings} from './mongoSetup';

const port = 3000;
const app = express();
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

        app.post('/habits', () => {
            const habit = new HabitModel({
                title: 'Привычка номер один',
                dateRange: ['', null],
                weekDays: [true, false, true, false, true, false, true],
                countNumber: 5,
            });
            habit.save()
                .then((data: IHabit) => logger.info({data}))
                .catch(({stack, message}: Error) => logger.error({stack}, message));
        });

        app.listen(port);
    })
    .catch(({message, stack}: Error) => logger.error({stack}, message));
