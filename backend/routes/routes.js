import express from 'express'
import { CreateEvent, DeleteEvent, GetEvent, GetEventByID, UpdateEvent } from '../controller/EventController.js'
import authMiddleware from '../middleware/auth.js'
const routers = express.Router()

routers.post('/create', authMiddleware, CreateEvent)
routers.get('/get/:id', authMiddleware, GetEventByID)
// routers.get('/get', authMiddleware, GetEvent)
routers.get('/get', GetEvent)
routers.put('/update/:id', authMiddleware, UpdateEvent)
routers.delete('/delete/:id', authMiddleware, DeleteEvent)

export default routers