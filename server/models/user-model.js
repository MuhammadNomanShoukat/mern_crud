const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Encrypte user entered password
userSchema.pre("save", async function () {
  const userData = this;

  if (!userData.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate jwt token
userSchema.methods.generateJwtToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "30d" },
    );
  } catch (err) {
    console.err(err);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
