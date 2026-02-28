const contactModel = require("../models/contact-model")

const contact = async (req, res) => {
    try {
        const body = req.body
        await contactModel.create(body)
        return res.status(200).json({msg: "Submitted successfully!"})
    } catch (error) {
        return res.status(500).send({ msg: "server error" });
    }
}

module.exports = contact