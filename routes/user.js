
const express = require('express');
const { login, signup } = require('../controllers/user');

const userRouter = express.Router();

userRouter.post("/sign", login)
userRouter.post("/signup", signup)

module.exports = userRouter;