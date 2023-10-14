const User = require("../models/user");
const { HttpError, controllerWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { role, _id, email, name, chief } = req.user;

  let response = null;

  if (role === "Admin") {
    const subordinates = await getSubordinates(_id);
    response = {
      admin: { _id, name, email, role },
      subordinates,
    };
  }

  if (role === "Boss") {
    const subordinates = await getSubordinates(_id);
    response = {
      boss: { _id, name, email, role, chief },
      subordinates,
    };
  }

  if (role === "RegUser") {
    response = { user: { _id, name, email, role, chief } };
  }

  res.status(200).json(response);
};

const getSubordinates = async (bossId) => {
  const users = await User.find({ chief: bossId });
  const resUsers = await Promise.all(
    users.map(async (user) => {
      const subordinates = await getSubordinates(user._id);
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subordinates,
      };
    })
  );
  return resUsers;
};

const subordinate = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const user = await User.findById(id);
  const boss = await User.findById(_id);

  if (!user || !boss) {
    throw HttpError(404);
  }
  if (user.role === "Admin") {
    throw HttpError(403, "You can not hire Admin!");
  }
  if (user.chief) {
    throw HttpError(403, "The user already has a boss");
  }

  await User.findByIdAndUpdate(id, { chief: _id });

  const isUserPromotedToBoss = await isPromoted(boss._id, boss.role);

  res.status(200).json({
    message: isUserPromotedToBoss
      ? `Congratulations, you're the boss now! The user ${user.name} is now your subordinate.`
      : `The user ${user.name} is now your subordinate.`,
  });
};

const changeBoss = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { newBossId } = req.body;

  const user = await User.findById(id);
  const boss = await User.findById(_id);
  const newBoss = await User.findById(newBossId);

  if (!user || !boss || !newBoss) {
    throw HttpError(404);
  }

  if (!user.chief.equals(_id)) {
    throw HttpError(403, "You can only reassign your subordinates");
  }

  await User.findByIdAndUpdate(id, { chief: newBoss._id });

  const isUserPromotedToBoss = await isPromoted(newBoss._id, newBoss.role);
  const isBossDemoted = await isDemoted(boss._id);

  res.status(200).json({
    message: isUserPromotedToBoss
      ? isBossDemoted
        ? `You're no longer the boss, you have no subordinates left! The ${user.name} is now ${newBoss.name} subordinate.`
        : `${newBoss.name} is boss now! The ${user.name} is now his subordinate.`
      : isBossDemoted
      ? `You're no longer the boss, you have no subordinates left! The ${user.name} is now ${newBoss.name} subordinate`
      : `${user.name} is now ${newBoss.name} subordinate`,
  });
};

const isPromoted = async (id, role) => {
  if (role === "RegUser") {
    await User.findByIdAndUpdate(id, { role: "Boss" });
    return true;
  }
  return false;
};

const isDemoted = async (id) => {
  const users = await User.find({ chief: id });

  if (users.length === 0) {
    await User.findByIdAndUpdate(id, { role: "RegUser" });
    return true;
  }
  return false;
};

module.exports = {
  getAll: controllerWrapper(getAll),
  subordinate: controllerWrapper(subordinate),
  changeBoss: controllerWrapper(changeBoss),
};
