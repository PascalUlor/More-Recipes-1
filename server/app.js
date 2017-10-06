import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.status(200);
    res.json({
        project: 'More-Recipes',
        message: 'Share your awesome recipes ideas'
    });
});

app.use('/api/v1/', apiRoutes);

app.use('*', (req, res) => {
    res.status(404);
    res.json({
        status: 'Failed',
        message: 'Page not found'
    });
});

app.listen(port, () => console.log(`Application started on port ${port}`));

export default app;