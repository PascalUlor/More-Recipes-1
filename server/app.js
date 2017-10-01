import express from 'express';
import bodyParser from 'body-parser';
import recipesRoute from './routes/recipes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200);
    res.json({
        name: 'Chike',
        message: 'Welcome to More-Recipes'
    });
});

app.use('/api/v1/', recipesRoute);
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