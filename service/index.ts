import {DatabaseConnection} from './server';

const app = new DatabaseConnection({});

app.connectToDb();
app.listen();
