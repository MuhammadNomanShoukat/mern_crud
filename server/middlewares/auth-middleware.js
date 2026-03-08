const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    let isAuthorized = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const { userId, email, isAdmin } = isAuthorized;
    req.email = email;
    req.userId = userId;
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "401 unauthorized user" });
  }
};

module.exports = authMiddleware;
