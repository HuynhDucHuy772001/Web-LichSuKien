import express from 'express'
import dbCon from './utlis/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import routers from './routes/routes.js';
import authRouters from './routes/authRoutes.js';
dotenv.config()
const app = express()

//mongoDB
dbCon()
//middlewares
app.use(express.json())
app.use(cors())
//route
app.use('/api/auth', authRouters)
app.use('/api', routers)
app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.PORT}`);
})