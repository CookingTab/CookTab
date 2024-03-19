const express = require("express");
const {
    addUser,
    loginWithCredentials,
} = require("../controllers/UserController");

const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/signin", loginWithCredentials);

module.exports = userRouter;
