const updateResponse = (users) => {
  if (!users) return [];
  const updated = users.map((user) => {
    const { _id, name, email, role, chief } = user.toObject();
    return { _id, name, email, role, chief };
  });
  return updated;
};

module.exports = updateResponse;
