import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import apiRoutes from './routes/apiRoutes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../template/public')));

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicpath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true
}));

app.use(webpackHotMiddleware(compiler));


// app.get('/', (req, res) => {
//     res.status(200);
//     res.json({
//         project: 'More-Recipes',
//         message: 'Share your awesome recipes ideas'
//     });
// });

app.use('/api/v1/', apiRoutes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// app.use('*', (req, res) => {
//     res.status(404);
//     res.json({
//         status: 'Failed',
//         message: 'Page not found'
//     });
// });

app.listen(port, () => console.log(`Application started on port ${port}`));

export default app;