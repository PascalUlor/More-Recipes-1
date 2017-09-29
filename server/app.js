import express from 'express';
import bodyParser from 'body-parser';

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

app.use('/api/', recipes);
app.use('/api/', (req, res) => {
    res.status(404);
    res.json({ msg: 'Page not found' });
});

app.listen(port, () => console.log(`Application started on port ${port}`));