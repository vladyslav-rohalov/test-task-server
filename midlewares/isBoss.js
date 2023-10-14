const { HttpError } = require("../helpers");

const isBoss = async (req, res, next) => {
  const { role } = req.user;

  if (role !== "Boss") {
    HttpError(403, "Access denied. Boss only");
  }
  next();
};

module.exports = isBoss;
