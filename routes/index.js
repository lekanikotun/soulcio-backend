var app = require('express')();

var mainController = require('../controllers/mainController')();


/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * authentication
 */
app.get('/api/v1/authenticate', mainController.getData);
app.post('/api/v1/login', mainController.login);
app.get('/api/v1/activityFeeds', mainController.activityFeeds);


module.exports = app;
