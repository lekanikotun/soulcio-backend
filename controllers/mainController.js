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
            //res.status(500).json(error);

            next(error);
        });

    }

    return {
        getData: getData
    }

};


module.exports = mainController;