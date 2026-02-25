require("dotenv").config()
const express = require("express")
const router = require("./router/auth-router")
const app = express()

const connectDb = require("./utils/db")

app.use(express.json())

app.use("/api/auth", router)

const PORT = 5000

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server runnin on port ${PORT}`)
    })
})

