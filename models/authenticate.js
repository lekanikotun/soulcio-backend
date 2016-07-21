/**
 Authentication
 */

var mainController = function() {

    var q = require('bluebird');
    var config = require('../config/index');
    var httpUtils = require('../utils/common/httpUtils')();
    var authenticateService = require('../services/authenticate');

    function getLoginForm() {

        return authenticateService.getLoginForm();
    }

    function login(email, password, ip) {

        return authenticateService.login(email, password, ip);

    }

    function logout(oauth_token, oauth_secret) {

        return authenticateService.logout(oauth_token, oauth_secret);
    }

    return {
        getLoginForm:       getLoginForm,
        login:              login,
        logout:             logout
    }

};


module.exports = mainController;