const express = require("express");
const {
    addUser,
    loginWithCredentials,
    currentUser,
    logout
} = require("../controllers/UserController");

const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/signin", loginWithCredentials);
userRouter.post("/profile", currentUser);
userRouter.post("/logout", logout);

module.exports = userRouter;
