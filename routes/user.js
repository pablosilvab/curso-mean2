'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/test-controller', UserController.pruebas);
api.post('/register', UserController.saveUser);

module.exports = api;
