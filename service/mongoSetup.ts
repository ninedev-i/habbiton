const server = 'mongodb://localhost:27017';
const database = 'habits';

export const serviceUrl = `${server}/${database}`;

export const connectionSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
