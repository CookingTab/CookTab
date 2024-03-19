const express = require("express");
const {
    addUser,
    loginWithCredentials,
    currentUser,
} = require("../controllers/UserController");

const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/signin", loginWithCredentials);
userRouter.post("/profile", currentUser);

module.exports = userRouter;
