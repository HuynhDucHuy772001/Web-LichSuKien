import express from 'express'
import { CreateUser, Login } from '../controller/UserController.js'
const authRouters = express.Router()

authRouters.post('/signup', CreateUser)
authRouters.post('/login', Login)

export default authRouters