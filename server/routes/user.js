const express = require("express")
const { addUser } = require("../controllers/UserController")

const userRouter = express.Router()

userRouter.post("/signup", addUser)


module.exports = userRouter