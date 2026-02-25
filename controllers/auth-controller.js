const home = async (req, res) => {
    try{
        res.status(200).json({msg: "controller home route working"})
    }catch(err){
        res.status(400).json({msg: "Page not found"})
    }
}

const register = async (req, res) => {
    try{
        console.log(req.body)
        res.status(200).json({msg: "controller register route working"})
    }catch(err){
        res.status(400).send({msg: "Page not found"})
    }
}

module.exports = {home, register}