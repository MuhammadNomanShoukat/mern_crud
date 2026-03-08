// const express = require("express")
// const Router = express.Router()
// const serviceController = require("../controllers/service-controller")

// Router.route("/services").get(serviceController)

// module.exports = Router


const express = require("express")
const router = express.Router()
const serviceController = require("../controllers/service-controller")

router.route("/services").get(serviceController)

module.exports = router