const userModel = require("../models/user-model");

const home = async (req, res) => {
  try {
    return res.status(200).json({ msg: "controller home route working" });
  } catch (err) {
    return res.status(400).json({ msg: "Page not found" });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email, phone, isAdmin } = req.body;

    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({
          message: "Email already exists.",
          status: 400,
          extraDetails: "Email already exists.",
        });
    }

    const userCreated = await userModel.create({
      username,
      password,
      email,
      phone,
      isAdmin,
    });

    return res.status(200).json({
      msg: "Record saved",
      token: await userCreated.generateJwtToken(),
      userId: userCreated._id.toString(),
      status: true,
    });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "user not exists.", status: 400, extraDetails: "user not exists." });
    }

    const userPass = await userExist.comparePassword(password);

    if (userPass) {
      return res.status(200).json({
        msg: "Record found",
        token: await userExist.generateJwtToken(),
        userId: userExist._id.toString(),
        isAdmin: userExist.isAdmin,
        status: true,
      });
    } else {
      return res.status(401).json({ message: "Invailid credentiols" });
    }
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

const user = async (req, res) => {
  try {
    const { userId, email, isAdmin } = req;

    const user = await userModel
      .findOne({ email: email })
      .select({ password: 0 });

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    return res.status(500).json({ message: "server error in user controller" });
  }
};

module.exports = { home, register, login, user };
