import {DatabaseConnection} from './server';

const app = new DatabaseConnection({});

app.connectToDb()
    .then(() => app.listen());
