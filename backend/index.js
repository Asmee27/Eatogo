import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8000
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())//middleware to parse json body
app.use(cookieParser())//middleware to parse cookies
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter) // Added userRouter to handle user routes

app.listen(port, () => {
    connectDb()
  console.log(`Server is running on port ${port}`)
})