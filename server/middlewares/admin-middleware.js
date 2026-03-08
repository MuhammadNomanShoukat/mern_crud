const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.isAdmin) {
      return res.status(401).json({ msg: "Access denied. Admin privileges required." });
    }
    next();
  } catch (error) {
    return res.status(401).json({ msg: "401 unauthorized user" });
  }
};

module.exports = adminMiddleware;
