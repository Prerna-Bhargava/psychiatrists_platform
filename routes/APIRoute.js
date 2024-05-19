const { register, psychiatristsDetails } = require('../controllers/controller');
const route = require("express").Router();

route.post('/patients/register', register);
route.post('/psychiatrists/details', psychiatristsDetails);



module.exports = route;