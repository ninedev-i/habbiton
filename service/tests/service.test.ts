import request from 'supertest';
import {Application} from 'express';
import {DatabaseConnection} from '../server';

describe('Service check', () => {
    let base: DatabaseConnection;
    let app: Application;

    beforeAll(async () => {
        base = new DatabaseConnection({
            port: process.env.port ? +process.env.port : 3000,
            serviceUrl: `localhost:${process.env.port}`,
        });

        app = base.getApp();

        await base.connectToDb();
    });

    afterAll(() => {
        base.disconnect();
    });

    test('Check DB connection', async () => {
        expect(base.checkConnection()).toBeTruthy();
    });

    test('Check habits post method', async () => {
        const habitObject = {
            title: 'Test habit',
            dateRange: ['2020-12-12', null],
            weekDays: [true, true, true, true, true, false, false],
            countNumber: 3,
        };

        const postedData = await request(app)
            .post('/habits')
            .send(habitObject)
            .then((data) => data.body);

        expect(postedData).toMatchObject(habitObject);
    });

    test('Check habits get method', async () => {
        const data = await request(app)
            .get('/habits')
            .then((res) => res.body);

        expect(data.length).toBe(1);
    });

    test('Check habits update method', async () => {
        const firstItem = await request(app)
            .get('/habits')
            .then((res) => res.body[0]);

        const title = 'Updated item';
        const updatedItem = await request(app)
            .post(`/habits/${firstItem._id}`)
            .send({...firstItem, ...{title}})
            .then((data) => data.body);

        expect(updatedItem.title).toBe(title);
    });

    test('Check habits delete method', async () => {
        const firstItemId = await request(app)
            .get('/habits')
            .then((res) => res.body[0]._id);

        await request(app)
            .delete(`/habits/${firstItemId}`);

        const habitItems = await request(app)
            .get('/habits')
            .then((res) => res.body);

        expect(habitItems.length).toBe(0);
    });

    test('Check progress post method', async () => {
        const progressObject = {
            date: '2020-12-12',
            habitId: 'some_id',
            progress: 3,
        };

        const postedData = await request(app)
            .post('/progress')
            .send(progressObject)
            .then((data) => data.body);

        expect(postedData).toMatchObject(progressObject);
    });

    test('Check progress get method', async () => {
        const date = '2020-12-12';
        const progress = await request(app)
            .get(`/progress/${date}`)
            .then((res) => res.body[0]);

        expect(progress.date).toBe(date);
    });

    test('Check progress update method', async () => {
        const firstItem = await request(app)
            .get('/progress/2020-12-12')
            .then((res) => res.body[0]);

        const progress = 6;
        const updatedItem = await request(app)
            .post(`/progress/${firstItem._id}`)
            .send({...firstItem, ...{progress}})
            .then((data) => data.body);

        expect(updatedItem.progress).toBe(progress);
    });
});
