const mongoose = require("mongoose")

const URI = process.env.MONGO_URI

const connectDb = async () => {
    try{
        await mongoose.connect(URI)
        console.log("DB connected successfully!")
    }catch(err){
        console.log("DB conntection fails")
        process.exit(0)
    }
}

module.exports = connectDb