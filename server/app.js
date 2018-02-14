import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from '../webpack.config.dev';
import webpackConfigProd from '../webpack.config.prod';
import apiRoutes from './routes/apiRoutes';

const app = express();

const port = process.env.PORT || 7777;
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '../client/assets')));
app.use(favicon(path.join(__dirname, '../client/favicon.ico')));

let compiler;
if (env === 'production') {
  compiler = webpack(webpackConfigProd);
  app.use(webpackMiddleware(compiler));
} else {
  compiler = webpack(webpackConfigDev);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicpath: '/',
    stats: { colors: true },
    noInfo: true
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use('/apidocs', express.static('apidocs'));

app.use('/api/v1/', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`Application started on port ${port}`));

export default app;
