import {DatabaseConnection} from './server';

const app = new DatabaseConnection({
    serviceUrl: process.env.SERVICE_URL,
});

app.connectToDb()
    .then(() => app.listen());
