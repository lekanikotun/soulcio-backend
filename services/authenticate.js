/**
 Authentication
 */

var mainController = function() {

    var q = require('bluebird');
    var config = require('../config/index');
    var httpUtils = require('../utils/common/httpUtils')();

    function getLoginForm() {

        var uri = config.baseUrl + 'login';

        httpUtils.get(uri).then(function(data) {
            return data;
        }).catch(function(err) {
            throw err;
        });
    }

   function login(email, password, ip) {

        var uri = config.baseUrl + 'login';
        var requestData = {
            email: email,
            password: password,
            ip: ip
        };

        httpUtils.postForm(uri, requestData).then(function(data) {
            return data
        }).catch(function(err) {
            throw err;
        });

    }

    function logout(oauth_token, oauth_secret) {

        var uri = config.baseUrl + 'logout';
        var requestData = {
            header: {
                oauth_token: oauth_token,
                oauth_secret: oauth_secret
            }
        };

        httpUtils.request(uri, requestData).then(function(data) {
            return data
        }).catch(function(err) {
            throw err;
        });
    }

    return {
        getLoginForm:       getLoginForm,
        login:              login,
        logout:             logout
    }

};


module.exports = mainController;