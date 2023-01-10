const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const cors = require('cors');

router.post('/createUser', userController.createUser);
router.get("/getUsers", userController.getUser);

module.exports = router