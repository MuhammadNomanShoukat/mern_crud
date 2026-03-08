const serviceModel = require("../models/service-model");

const service = async (req, res) => {
  try {
    const services = await serviceModel.find();
    return res.status(200).json({ msg: services });
  } catch (error) {
    return res.status(500).json({ msg: "service controller error", error });
  }
};

module.exports = service;
