import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,x-access-token,content-type,Origin, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.status(200);
    res.json({
        name: 'Chike',
        message: 'Welcome to More-Recipes'
    });
});

app.use('/api/v1/', apiRoutes);
app.use('/api/v1/', (req, res) => {
    res.status(404);
    res.json({
        status: 'Failed',
        message: 'Page not found'
    });
});

app.use('*', (req, res) => {
    res.status(404);
    res.json({
        status: 'Failed',
        message: 'Page not found'
    });
});

app.listen(port, () => console.log(`Application started on port ${port}`));

export default app;