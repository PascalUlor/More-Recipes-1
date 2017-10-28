'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apiRoutes = require('./routes/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.status(200);
    res.json({
        project: 'More-Recipes',
        message: 'Share your awesome recipes ideas'
    });
});

app.use('/api/v1/', _apiRoutes2.default);

app.use('*', function(req, res) {
    res.status(404);
    res.json({
        status: 'Failed',
        message: 'Page not found'
    });
});

app.listen(port, function() {
    return console.log('Application started on port ' + port);
});

exports.default = app;