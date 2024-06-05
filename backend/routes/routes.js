import express from 'express'
import { CreateEvent, DeleteEvent, GetEvent, GetEventByID, UpdateEvent } from '../controller/EventController.js'
const routers = express.Router()

routers.post('/create', CreateEvent)
routers.get('/get/:id', GetEventByID)
routers.get('/get', GetEvent)
routers.put('/update/:id', UpdateEvent)
routers.delete('/delete/:id', DeleteEvent)

export default routers