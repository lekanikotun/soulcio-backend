'use strict';

function httpUtils() {

    var _ = require('lodash');
    var q = require('bluebird');
    var Request = require('request');
    var config = require('../../config/index');
    var Promise = q.Promise;

    function sendRequest(url, requestParams, useHeader) {

        useHeader = useHeader || true;

        var requestObject = {
            url: url,
            method: requestParams.method || 'GET',
            json: true,
            maxRetries: requestParams.maxRetries || 0,
            timeout: 3000,
            rejectUnauthorized: false
        };

        if (requestParams) {
            requestObject = _.merge({}, requestObject, requestParams);
        }

        if (useHeader) {
            if (!requestObject.headers) requestObject.headers = {};
            requestObject.headers['Accept'] = 'application/json';
            requestObject.headers['oauth_consumer_key'] = config.oauth_consumer_key;
            requestObject.headers['oauth_consumer_secret'] = config.oauth_consumer_secret;
        }

        return new Promise(function(resolve, reject) {

            Request(requestObject, function(error, response, body) {
                if (error) return reject(error);
                return resolve(body);
            });

        }).catch(function(error) {
            throw error;
        });
    }

    function get(url, data, useHeader) {
        return sendRequest(url, {qs: data}, useHeader);
    }

    function post(url, data, useHeader) {
        return sendRequest(url, {body: data, method: 'POST'}, useHeader);
    }

    function postForm(url, data, useHeader) {
        return sendRequest(url, {formData: data, method: 'POST'}, useHeader);
    }

    function request(request, useHeader) {
        return sendRequest(request.uri, request, useHeader);
    }

    return {
        get:        get,
        post:       post,
        postForm:   postForm,
        request:    request
    }
}

module.exports = httpUtils;