require("dotenv").config()
const express = require("express")
const authRouter = require("./router/auth-router")
const contactRouter = require("./router/contact-router")
const app = express()

const connectDb = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/form", contactRouter)
app.use(errorMiddleware)

const PORT = 5000

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server runnin on port ${PORT}`)
    })
})

