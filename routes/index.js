var express = require('express');
var router = express.Router();


var mainController = require('../controllers/mainController')();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * authentication
 */
router.get('/api/v1/authenticate', mainController.getData);


module.exports = router;
