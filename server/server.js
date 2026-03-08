require("dotenv").config()
const express = require("express")
const authRouter = require("./router/auth-router")
const contactRouter = require("./router/contact-router")
const serviceRouter = require("./router/service-router")
const adminRouter = require("./router/admin-router")
const cors = require('cors')
const app = express()

const connectDb = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/form", contactRouter)
app.use("/api/data", serviceRouter)
app.use("/api/admin", adminRouter)
app.use(errorMiddleware)    

const PORT = 5000

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server runnin on port ${PORT}`)
    })
})

