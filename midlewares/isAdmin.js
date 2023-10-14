const { HttpError } = require("../helpers");

const isAdmin = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "Admin") {
    HttpError(403, "Access denied. Admin only");
  }
  next();
};

module.exports = isAdmin;
