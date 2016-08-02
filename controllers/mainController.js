/**
 Authentication
 */

var mainController = function() {

    var q = require('bluebird');
    var config = require('../config/index');
    var request = require('request');
    var httpUtils = require('../utils/common/httpUtils')();

    function getData(req, res, next) {

        var uri = config.baseUrl + 'login';

        var data = {
                email: 'lekanikotun@mediaintellects.com',
                password: 'password1',
                ip: '127.0.0.1'
        };

        httpUtils.postForm(uri, data).then(function(data) {

            res.status(200).json(data);

        }).catch(function(error) {

            console.log(error);

            next(error);
        });

    }

    function login(req, res, next) {



        var uri = config.baseUrl + 'login';

        var data = {
            email: req.body.email,
            password: req.body.password,
            ip: req.ip === '::1' ? '127.0.0.1' : req.ip
        };

        console.log("Request Data", req);

        httpUtils.postForm(uri, data).then(function(data) {

            res.status(200).json(data);

        }).catch(function(error) {

            console.log(error);
            //res.status(500).json(error);

            next(error);
        });
    }

    function activityFeeds(req, res, next) {

        var uri = config.baseUrl + 'activity';

        httpUtils.get(uri).then(function(data) {
            res.status(200).json(data);
        }).catch(function(error) {

            console.log(error);
            //res.status(500).json(error);

            next(error);
        });
    }

    return {
        getData: getData,
        login: login,
        activityFeeds: activityFeeds
    }

};


module.exports = mainController;