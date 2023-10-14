const authenticate = require("./authenticate");
const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const isAdmin = require("./isAdmin");
const isBoss = require("./isBoss");

module.exports = {
  authenticate,
  isValidId,
  validateBody,
  isAdmin,
  isBoss,
};
