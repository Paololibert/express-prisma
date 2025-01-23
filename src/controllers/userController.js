const prisma = require('../utils/prisma');

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { roles: true, permissions: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// adding a role and permission
const assignRoleOrPermission = async (req, res) => {
  const { userId, roleId, permissionId } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        roles: roleId ? { connect: { id: roleId } } : undefined,
        permissions: permissionId ? { connect: { id: permissionId } } : undefined,
      },
      include: { roles: true, permissions: true },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllUsers, assignRoleOrPermission };
