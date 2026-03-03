const express = require("express")
const router = express.Router()
const contactControler = require("../controllers/contact-controller")

router.route("/contact").post(contactControler)

module.exports = router